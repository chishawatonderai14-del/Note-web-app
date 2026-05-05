import { Component } from '@angular/core';
import { DashboardRoutingModule } from "../dashboard-routing-module";
import { AddNote } from "../components/add-note/add-note";

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [DashboardRoutingModule, AddNote],
  templateUrl: './layout-shell.html',
  styleUrl: './layout-shell.css',
})
export class LayoutShell{

}
