import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoteRequestType, NoteType, pinNoteResponseType, pinNoteType } from '../models/note_model';
import { NotesResponseType } from '../models/note_model';
import { NoteResponseType } from '../models/note_model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient){}
  private apiUrl = 'http://192.168.200.166:3002/api';
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
}
