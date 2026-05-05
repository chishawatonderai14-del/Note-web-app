import { Component, Input } from '@angular/core';
import { NoteService } from '../../services/note-service';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [],
  templateUrl: './heading.html',
  styleUrl: './heading.css',
})
export class Heading {
  constructor(private noteService: NoteService){}
  @Input() heading!: string;
  openMenu(){
    this.noteService.openMenu();
  }
}
