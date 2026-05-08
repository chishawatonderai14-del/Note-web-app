import { Component } from '@angular/core';
import { DashboardRoutingModule } from "../dashboard-routing-module";
import { AddNote } from "../components/add-note/add-note";
import { BottomNav } from "../components/bottom-nav/bottom-nav";
@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [DashboardRoutingModule, AddNote, BottomNav],
  templateUrl: './layout-shell.html',
  styleUrl: './layout-shell.css',
})
export class LayoutShell{

}
