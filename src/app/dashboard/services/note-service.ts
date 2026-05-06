import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityBigType, ActivityResponseType, ActivityType, categoryResponseType, categoryType, EmptyStateMessageType, NoteRequestType, NoteType, pinNoteResponseType, pinNoteType } from '../models/note_model';
import { NotesResponseType } from '../models/note_model';
import { NoteResponseType } from '../models/note_model';
import { BehaviorSubject, combineLatest, filter, map } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BottomNav } from '../components/bottom-nav/bottom-nav';


@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient, private overlay: Overlay){}
  overlayRef!: OverlayRef;
  private apiUrl = 'http://192.168.200.166:3004/api';
  private notes = new BehaviorSubject<NoteType[]>([]);
  private noteState = new BehaviorSubject<string>('');
  private stateMsg = new BehaviorSubject<EmptyStateMessageType>({heading: "No notes yet!", text: 'Start by creating you first note.'});
  private page = new BehaviorSubject<string>('home');
  private categories = new BehaviorSubject<categoryType[]>([]);
  currentCategories$ = this.categories.asObservable();
  currentPage$ = this.page.asObservable();
  currentStateMsg$ = this.stateMsg.asObservable();
  currentNoteState$ = this.noteState.asObservable();
  currentNotes$ = combineLatest([
    this.notes.asObservable(),
    this.currentNoteState$
  ]).pipe(
    map(([notes, state]) => {
      switch(state) {
        case 'favourites':
          return notes.filter(note => note.pinned);
        case 'trash':
          return notes.filter(note => note.trash);
        case 'all notes':
        default: 
          return notes;
      }
    })
  );
  openMenu() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
      .global()
      .top('20px')
    });
    const portal = new ComponentPortal(BottomNav);
    const componentRef = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(res => {
      componentRef.instance.close();
    });
    componentRef.instance.close$.subscribe(res => {
      console.log(res);
      this.overlayRef.detach();
    })
  }
  loadCategories(){
    this.getCategories().subscribe(res => {
      this.categories.next(res.categories);
    });
  }
  loadNotes() {
    console.log("LOAD NOTES CALLED;");
    this.loadPage();
    this.getNoteState();
    this.loadCategories();
    console.time("API");
    this.getNotes().subscribe((data) => {
      console.timeEnd('API');
      this.notes.next(data.notes)
    });
  }
  private getNoteState(){
    // comming from the localstorage
    if(localStorage.getItem('noteState') == null){
      if (this.noteState.getValue() == ''){
        this.noteState.next('all notes');
        localStorage.setItem('noteState', "all notes");
      }
    }else {
      if (this.noteState.getValue() == ''){
        this.noteState.next(localStorage.getItem('noteState')|| "all notes");
      }
    }
  }
  updateNoteState(noteState: string){
    this.noteState.next(noteState);
    localStorage.setItem('noteState', noteState);
  }
  private getNotes() {
    return this.http.get<NotesResponseType>(`${this.apiUrl}/get-notes`);
  }
  
  createNote(note: NoteRequestType){
    return this.http.post<NoteResponseType>(`${this.apiUrl}/create-note`, note);
   }

  deleteNote(id: string){
    return this.http.delete<NoteResponseType>(`${this.apiUrl}/delete-note/${id}`);
  }
  formatContent(content: string){
    if(content.length > 28){
      content = content.slice(0, 28);
      content += "...";
    }
    return content;
  }
  pinNote(note: pinNoteType){
    this.notes.next(this.notes.getValue().map(n => parseInt(n.id) === note.noteId? {...n, pinned: !note.pinned} : n));
    this.http.put<pinNoteResponseType>(`${this.apiUrl}/pin-note`, note).pipe(
      map(res => res?.message)
    ).subscribe();
  }
  getStateMessage(state: string){
    switch(state){
      case 'favourites':
        return {heading: "No pinned notes!!", text: 'Start by pinning you first note!!.'};
      case 'trash':
        return {heading: 'Bin is Empty', text: 'Nothing in the bin as of now!'};
      case 'all notes':
      default:
        return {heading: "No notes yet!", text: 'Start by creating you first note.'};
    }
  }
  private reloadStateMsg(){
    this.stateMsg.next(this.getStateMessage(this.noteState.getValue()));
  }
  getCategories(){
    return this.http.get<categoryResponseType>(`${this.apiUrl}/get-categories`);
  }
  setPage(page: string){
    this.page.next(page);
    localStorage.setItem('page', page);
  }
  loadPage(){
    let page = localStorage.getItem('page');
    if (!page) page = 'home';
    this.page.next(page);
  }
  private chooseTimeRepresantation(isTime: boolean, date: string){
    const dateList = date.split('T');
    if (isTime) {
      const time = dateList[0];
      return time;
    }else{
      const day = dateList[1];
      return day;
    }
  }
  formatNoteTime(date: string){
    const today = new Date();
    let strToday = this.formatDate(today);
    let todayDate = this.chooseTimeRepresantation(false, strToday);
    let noteDate = this.chooseTimeRepresantation(false, date);
    if (this.isItThisMonth(todayDate, noteDate) && this.isItThisYear(todayDate, noteDate)){
      if (this.isItToday(todayDate, noteDate)){
        return this.chooseTimeRepresantation(true, date);
      }else {
        if (this.isItYersteday(todayDate, noteDate)){
          return "Yesterday";
        }else{
          return this.chooseTimeRepresantation(false, date);
        }
      }
    }else {
      return this.chooseTimeRepresantation(false, date);
    }
  }
  private formatDate(date: Date){
      let d = new Date(date).toISOString().slice(0, 16);
      let time = d.slice(11,16);
      let day = parseInt(d.slice(8,10));
      let month = parseInt(d.slice(5,7));
      let strMonth = this.getMonth(month);
      let year = parseInt(d.slice(0,4));
      d = time + "T" + strMonth + " " + day + ", " + year;
      return d;
  }
  private getMonth(num: number){
      if (num >= 1 && num <= 12){
          switch(num) {
              case 1:
                  return "Jan";
              case 2:
                  return "Feb";
              case 3:
                  return "Mar";
              case 4:
                  return "Apr";
              case 5:
                  return "May";
              case 6:
                  return "Jun";
              case 7:
                  return "Jul";
              case 8:
                  return "Aug";
              case 9:
                  return "Sep";
              case 10:
                  return "Oct";
              case 11:
                  return "Nov";
              case 12:
              default:
                  return "Dec";
          }
      }else {
        return 'Jan';
      }
  }
  private isItThisMonth(todayDate: string, noteDate: string){
    let todayM = todayDate.slice(0,3);
    let noteM = noteDate.slice(0,3);
    if ( todayM === noteM){
      //console.log("IT IS THIS MONTH");
      return true;
    }else{
      //console.log("IT IS NOT THIS MONTH");
      return false;
    }
  }
  private isItYersteday(todayDate: string, noteDate: string){
    let dayLenEqual = todayDate.length === noteDate.length;
    if (todayDate.length == 11 && dayLenEqual){
      if (parseInt(todayDate[4]) - 1 == parseInt(noteDate[4])){
        return true;
      
      }else {
        return false ;
      } 
    }else if (todayDate.length == 12 && dayLenEqual){
      if (parseInt(todayDate.slice(4,6)) - 1 == parseInt(noteDate.slice(4,6))){
        return true;
      }else {return false;}
    }else {
      if (todayDate.length == 12){
        if (parseInt(todayDate.slice(4,6)) - 1 == parseInt(noteDate[4])){
          return true ;
        }else{
          return false;
        }
      }
    }
    return false;
  }
  private isItToday(todayDate: string, noteDate: string){
    let dayLenEqual = todayDate.length === noteDate.length;
    if (dayLenEqual){
      if (todayDate[4] === noteDate[4]){
        //console.log("IT IS TODAY");
        return true;
      }else {
        //console.log("IT IS NOT TODAY");
        return false;
      }
    }else {
      //console.log("IT IS NOT TODAY");
      return false;
    }
  }
  private isItThisYear(todayDate: string, noteDate: string){
    let todayY = todayDate.slice(7,11);
    let noteY = noteDate.slice(7,11);
    if ( todayY.length == noteY.length && todayY == noteY){
      //console.log("IT IS THIS YEAR");
      return true;
    }else {
      //console.log("IT IS NOT THIS YEAR");
      return false;
    }
  }
  sortActivity(activityList: ActivityType[]){
    let returnList: ActivityBigType[] = [];
    // change the events dates 
    activityList = this.sortEventDates(activityList);
    for (const activity of activityList){
        let found = false;
        for (let i = 0; i < returnList.length; i++){
            if(activity.timestamp == returnList[i].date || (activity.timestamp.length == 5 && returnList[i].date.length == 5 ) ){
                returnList[i].events.push(activity);
                found = true;
                break;
            }
        }
        if (!found){
          const dateVar: ActivityBigType = {date: activity.timestamp, events: [activity]};
          returnList.push(dateVar);
        }
    }
    return returnList;
  }
  sortEventDates(eventList: ActivityType[]){
    return eventList.map(item =>({...item, timestamp: this.formatNoteTime(item.timestamp)}));
  }
  getActivities(){
    return this.http.get<ActivityResponseType>(`${this.apiUrl}/get-activities`).pipe(
      map(activityR => this.sortActivity(activityR.activities))
    )
  }
}
