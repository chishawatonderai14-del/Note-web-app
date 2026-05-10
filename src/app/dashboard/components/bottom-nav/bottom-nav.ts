import { Component, DestroyRef, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgClass } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { J } from '@angular/cdk/keycodes';
import { AuthService } from '../../../auth/services/auth-service';
@Component({
  selector: 'app-bottom-nav',
  imports: [NgClass],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css',
})
export class BottomNav implements OnInit{
  constructor(private noteService: NoteService, private route : ActivatedRoute){}
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  ngOnInit(): void {
    const img = new Image();
    img.src = "/assets/boy.webp";
    img.onload = () => {
      console.log("image loaded");
    } 
    const other = this.route.snapshot.paramMap.get('id');
    console.log(other);
    if(!other){
      this.noteService.loadPage();
      this.noteService.currentPage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
        this.page = res;
        this.router.navigate([`/dashboard/${this.page}`]);
      });
    }
  }
  name: string = this.authService.getName() || '';
  email: string = this.authService.getEmail() || '' ;
  private router = inject(Router);
  close$ = new EventEmitter<any>();
  @ViewChild('bottomNav') panel!: ElementRef;
  page!: string;
  navigate(page: string){
    this.noteService.setPage(page);
    this.close();
  }
  logout(){
    this.authService.logout();
    this.close$.emit('close');
  }
  close() {
    console.log("CLOSED");
    const el = this.panel.nativeElement as HTMLElement;

    el.classList.add('closing');

    setTimeout(() => {
      console.log('NOW EMITTING CLOSE');
      this.close$.emit('Event emitted from the x icon');
      if(this.page) this.router.navigate([`/dashboard/${this.page}`]);
    }, 150); // match animation duration
  }
}
