import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmptyStateMessageType, NoteRequestType, NoteType, pinNoteResponseType, pinNoteType } from '../models/note_model';
import { NotesResponseType } from '../models/note_model';
import { NoteResponseType } from '../models/note_model';
import { BehaviorSubject, combineLatest, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient){}
  private apiUrl = 'http://192.168.200.166:3002/api';
  private notes = new BehaviorSubject<NoteType[]>([]);
  private noteState = new BehaviorSubject<string>('');
  private stateMsg = new BehaviorSubject<EmptyStateMessageType>({heading: "No notes yet!", text: 'Start by creating you first note.'});
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
  loadNotes() {
    this.getNoteState();
    this.getNotes().subscribe((data) => {
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
    return this.http.put<pinNoteResponseType>(`${this.apiUrl}/pin-note`, note).pipe(
      map(res => res.message)
    );
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
  reloadStateMsg(){
    this.stateMsg.next(this.getStateMessage(this.noteState.getValue()));
  }

}
