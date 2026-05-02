import { Component } from '@angular/core';
import { Heading } from "../components/heading/heading";
import { SearchBar } from "../components/search-bar/search-bar";
import { NoteList } from "../components/note-list/note-list";
import { AddNote } from "../components/add-note/add-note";
import { NavBar } from "../components/nav-bar/nav-bar";

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [Heading, NoteList, AddNote, NavBar],
  templateUrl: './layout-shell.html',
  styleUrl: './layout-shell.css',
})
export class LayoutShell{
}
