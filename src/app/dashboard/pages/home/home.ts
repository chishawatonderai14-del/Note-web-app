import { Component } from '@angular/core';
import { Heading } from "../../components/heading/heading";
import { NavBar } from "../../components/nav-bar/nav-bar";
import { NoteList } from "../../components/note-list/note-list";
import { AddNote } from "../../components/add-note/add-note";

@Component({
  selector: 'app-home',
  imports: [Heading, NavBar, NoteList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  value : string = "NoteApp";
}
