import { Component } from '@angular/core';
import { Heading } from "../components/heading/heading";
import { SearchBar } from "../components/search-bar/search-bar";
import { NoteList } from "../components/note-list/note-list";
import { AddNote } from "../components/add-note/add-note";

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [Heading, SearchBar, NoteList, AddNote],
  templateUrl: './layout-shell.html',
  styleUrl: './layout-shell.css',
})
export class LayoutShell{
}
