import { Component } from '@angular/core';
import { Heading } from "../../components/heading/heading";
import { Otherheading } from "../../components/otherheading/otherheading";

@Component({
  selector: 'app-privacypage',
  imports: [Heading, Otherheading],
  templateUrl: './privacypage.html',
  styleUrl: './privacypage.css',
})
export class Privacypage {
  headingInfo = {
    heading: "Privacy & Security",
    searchPresent: false
  }
}
