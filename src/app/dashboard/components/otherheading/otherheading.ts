import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otherheading',
  imports: [],
  templateUrl: './otherheading.html',
  styleUrl: './otherheading.css',
})
export class Otherheading {

  router = inject(Router);
  @Input() headingInfo = {
    heading: "About Note App"
  }
  year: any = new Date().getFullYear();
  goBack(){
    this.router.navigate(['dashboard/profile']);
  }
}
