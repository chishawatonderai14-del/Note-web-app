import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-display-msg',
  imports: [NgClass],
  templateUrl: './display-msg.html',
  styleUrl: './display-msg.css',
})
export class DisplayMsg implements OnInit {
  ngOnInit(): void{
    this.icon = this.event.toLowerCase();
    setTimeout(() => {
      this.close$.emit("emit successful");
    }, 2000);
  }
  event!: string;
  msg!: string;
  icon!: string ;
  getMsg(message: string, event: string) {
    this.msg = message;
    this.event = event;
  }
  close(){
    this.close$.emit('emit successful');
  }
  close$ = new EventEmitter<any>();
}
