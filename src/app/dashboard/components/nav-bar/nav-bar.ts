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
}
