import { Component, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { NoteService } from '../../services/note-service';
@Component({
  selector: 'app-nav-bar',
  imports: [NgClass],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit{
  constructor(private noteService: NoteService){}
  ngOnInit(): void {
    this.noteService.currentNoteState$.subscribe((res) => {
      this.value = res;
    })
  }
  value ?: string;
  changeNav(nav: string){
    if (nav != this.value){
      this.noteService.updateNoteState(nav);
    }
  }
  getTransform() {
    switch (this.value) {
      case 'all notes':
        return 'translateX(0%)';

      case 'favourites':
        return 'translateX(102%)'; // include gap

      case 'trash':
        return 'translateX(204%)';

      default:
        return 'translateX(0%)';
    }
  }
}
