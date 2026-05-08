import { Component } from '@angular/core';
import { Heading } from "../../components/heading/heading";
import { Otherheading } from "../../components/otherheading/otherheading";

@Component({
  selector: 'app-editprofile',
  imports: [ Otherheading],
  templateUrl: './editprofile.html',
  styleUrl: './editprofile.css',
})
export class Editprofile {
  headingInfo = {
    heading: "Edit Profile",
    searchPresent: false
  }
}
