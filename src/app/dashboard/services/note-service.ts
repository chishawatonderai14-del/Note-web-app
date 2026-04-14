import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoteType } from '../models/note_model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient){}
  private notes = new BehaviorSubject<NoteType[]>([]);
  currentNotes$ = this.notes.asObservable();
  refresh(){
    localStorage.removeItem("notes");
    this.loadFromJson();
  }

  loadNotes(){
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      this.notes.next(JSON.parse(storedNotes));
      return;
    }
    this.loadFromJson();
  }

  private loadFromJson(){
    this.http.get<NoteType[]>('/assets/data.json').subscribe(data => {
      this.notes.next(data);
      localStorage.setItem("notes", JSON.stringify(data));
    });
  }
  getNotes() {
    localStorage.setItem("notes", JSON.stringify(this.notes.getValue()));
    return this.currentNotes$;
  }
  getColor(){
    const colors = ["blue", "green", "yellow", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  addNote(note: NoteType){
    const currentNotes = this.notes.getValue();
    this.notes.next([...currentNotes, note]);
    localStorage.setItem("notes", JSON.stringify(this.notes.getValue()));
  }
  deleteNote(id: number){
    const currentNotes = this.notes.getValue();
    this.notes.next(currentNotes.filter((note) => note.id !== id));
    localStorage.setItem("notes", JSON.stringify(this.notes.getValue()));
  }
  getNextId(){
    return this.notes.getValue().length > 0 ? Math.max(...this.notes.getValue().map(n => n.id)) + 1 : 1;
  }
}
