import { Component, inject, Input } from '@angular/core';
import { NoteService } from '../../services/note-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-note.html',
  styleUrl: './empty-note.css',
})
export class EmptyNote {
  @Input() message = {
    heading: 'No notes yet!',
    text: 'Start by creating you first note.'
  }
}
