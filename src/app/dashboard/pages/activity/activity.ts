import { Component, OnInit } from '@angular/core';
import { Heading } from "../../components/heading/heading";
import { NoteService } from '../../services/note-service';
import { ActivityBigType, ActivityType } from '../../models/note_model';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-activity',
  imports: [Heading, CommonModule],
  templateUrl: './activity.html',
  styleUrl: './activity.css',
})
export class Activity implements OnInit{
  constructor(private noteService: NoteService){}
  ngOnInit(): void {
    this.noteService.getActivities().subscribe(res => {
      this.activities = res;
    })
  }
  activities!: ActivityBigType[];
}
