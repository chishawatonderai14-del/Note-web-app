import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";
import { Router } from '@angular/router';
import { NoteService } from '../../services/note-service';

@Component({
  selector: 'app-bottom-nav',
  imports: [NgClass],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
})
export class BottomNav implements OnInit{
  constructor(private noteService: NoteService){}
  ngOnInit(): void {
    this.noteService.loadPage();
    this.noteService.currentPage$.subscribe(res => {
      this.page = res;
      this.router.navigate([`/dashboard/${this.page}`]);
    });
  }
  private router = inject(Router);
  close$ = new EventEmitter<any>();
  page!: string;
  navigate(page: string){
    this.noteService.setPage(page);
    this.router.navigate([`/dashboard/${page}`]);
    this.close$.next('Event Emitted successfully');
  }
  close(){
    this.close$.emit('Event emitted from the x icon');
  }
}
