import { Component, OnInit } from '@angular/core';
import { Heading } from "../../components/heading/heading";
import { NoteService } from '../../services/note-service';
import { ActivityBigType } from '../../models/note_model';
import { CommonModule } from "@angular/common";
import { EmptyNote } from "../../components/empty-note/empty-note";

@Component({
  selector: 'app-activity',
  imports: [Heading, CommonModule, EmptyNote],
  templateUrl: './activity.html',
  styleUrl: './activity.css',
})
export class Activity implements OnInit{
  constructor(private noteService: NoteService){}
  ngOnInit(): void {
    this.noteService.getActivities().subscribe(res => {
      this.activities = res;
    });
    if(this.activities.length != 0){
      this.empty = false;
    }
  
  }
  empty = true;
  activities: ActivityBigType[] = [];
}
