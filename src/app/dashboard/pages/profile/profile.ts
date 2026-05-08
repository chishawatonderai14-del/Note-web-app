import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Heading } from "../../components/heading/heading";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-profile',
  imports: [Heading, NgClass],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  router = inject(Router);
  headingInfo = {
    heading: "Profile",
    searchPresent: false
  }
  darkMode = false;
  enterDarkMode(){
    this.darkMode = !this.darkMode;
  }
  navigate(page: string){
    this.router.navigate([`/dashboard/${page}`])
  }
  close(){
    this.router.navigate(['/dashboard/home']);
  }
}
