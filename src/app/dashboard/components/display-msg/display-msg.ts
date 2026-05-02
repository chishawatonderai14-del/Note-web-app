import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-msg',
  imports: [],
  templateUrl: './display-msg.html',
  styleUrl: './display-msg.css',
})
export class DisplayMsg implements OnInit {
  ngOnInit(): void{
    setTimeout(() => {
      this.close$.emit("emit successful");
    }, 800);
    
  }
  msg ?: string;
  getMsg(message: string) {
    this.msg = message;
  }
  close$ = new EventEmitter<any>();
}
