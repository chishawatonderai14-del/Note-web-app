import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoteRequestType, NoteType } from '../models/note_model';
import { NotesResponseType } from '../models/note_model';
import { NoteResponseType } from '../models/note_model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient){}
  private apiUrl = 'http://192.168.200.166:3000/api';
  private notes = new BehaviorSubject<NoteType[]>([]);
  currentNotes$ = this.notes.asObservable();

  loadNotes() {
    this.getNotes().subscribe((data) => {
      this.notes.next(data.notes)
    });
  }
  
  getNotes() {
    return this.http.get<NotesResponseType>(`${this.apiUrl}/get-notes`);
  }
  
  createNote(note: NoteRequestType){
    return this.http.post<NoteResponseType>(`${this.apiUrl}/create-note`, note);
   }

  deleteNote(id: string){
    return this.http.delete<NoteResponseType>(`${this.apiUrl}/delete-note/${id}`);
  }
  getColor(){
    const colors = ["blue", "green", "yellow", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

}
