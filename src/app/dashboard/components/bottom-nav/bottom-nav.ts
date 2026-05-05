import { Component, DestroyRef, ElementRef, EventEmitter, inject, OnInit, ViewChild } from '@angular/core';
import { NgClass } from "@angular/common";
import { Router } from '@angular/router';
import { NoteService } from '../../services/note-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-bottom-nav',
  imports: [NgClass],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
})
export class BottomNav implements OnInit{
  constructor(private noteService: NoteService){}
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    const img = new Image();
    img.src = "/assets/boy.webp";
    img.onload = () => {
      console.log("image loaded");
    }
    this.noteService.loadPage();
    this.noteService.currentPage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.page = res;
      this.router.navigate([`/dashboard/${this.page}`]);
    });
  }
  private router = inject(Router);
  close$ = new EventEmitter<any>();
  @ViewChild('bottomNav') panel!: ElementRef;
  page!: string;
  navigate(page: string){
    this.noteService.setPage(page);
    this.router.navigate([`/dashboard/${page}`]);
    this.close$.next('Event Emitted successfully');
  }

  close() {
    console.log("CLOSED");
    const el = this.panel.nativeElement as HTMLElement;

    el.classList.add('closing');

    setTimeout(() => {
      console.log('NOW EMITTING CLOSE');
      this.close$.emit('Event emitted from the x icon');
    }, 150); // match animation duration
  }
}
