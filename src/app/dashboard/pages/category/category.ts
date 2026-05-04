import { Component, inject, OnInit } from '@angular/core';
import { categoryType } from '../../models/note_model';
import { NoteService } from '../../services/note-service';
import { CommonModule } from "@angular/common";
import { Heading } from '../../components/heading/heading';
import { SearchBar } from '../../components/search-bar/search-bar';

@Component({
  selector: 'app-category',
  imports: [CommonModule, Heading, SearchBar],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit{
  constructor(private noteService: NoteService){}
  title : string = "Categories";
  searchValue = "Search categories...";
  ngOnInit(): void {
    this.noteService.getCategories().subscribe({
      next: (categoryList) => {
        this.categories = categoryList.categories;
        console.log(categoryList)
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }
  categories !: categoryType[];
}
