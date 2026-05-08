import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Otherheading } from "../../components/otherheading/otherheading";

@Component({
  selector: 'app-about',
  imports: [Otherheading],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  router = inject(Router);
  headingInfo = {
    heading: "About Note App",
    searchPresent: false,
  }
  year: any = new Date().getFullYear();
  goBack(){
    this.router.navigate(['dashboard/profile']);
  }
}
