import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-note-heading',
  imports: [],
  templateUrl: './note-heading.html',
  styleUrl: './note-heading.css',
})
export class NoteHeading {
  @Input() heading!: string;
}
