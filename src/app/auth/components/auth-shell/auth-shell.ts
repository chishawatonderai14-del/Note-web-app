import { Component } from '@angular/core';
import { AuthRoutingModule } from "../../auth-routing-module";

@Component({
  selector: 'app-auth-shell',
  imports: [AuthRoutingModule],
  templateUrl: './auth-shell.html',
  styleUrl: './auth-shell.css',
})
export class AuthShell {

}
