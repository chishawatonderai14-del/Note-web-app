import { Component, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NoteService } from '../../services/note-service';
import { categoryType, categType } from '../../models/note_model';
@Component({
  selector: 'app-categorydropdown',
  imports: [CommonModule],
  templateUrl: './categorydropdown.html',
  styleUrl: './categorydropdown.css',
})
export class Categorydropdown implements OnInit{
  constructor(private noteService: NoteService){}
  ngOnInit(): void {
    this.noteService.getCateg().subscribe({
      next: (res) => {
        this.categories = res.categories;
      }
    });
    
  }
  see(){
    console.log(this.categories);
  }
  close$ = new EventEmitter<string>();
  categories!: categType[] ;
  category = '';
  close(category: string){
    this.close$.emit(category);
  }
  getCategory(category: string ){
    this.category = category;
  }
}
