import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteService } from './dashboard/services/note-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('note-web-app');
  constructor(private noteService: NoteService){
    this.noteService.loadNotes();
  }
}
