import { Component } from '@angular/core';
import { DashboardRoutingModule } from "../dashboard-routing-module";

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [DashboardRoutingModule],
  templateUrl: './layout-shell.html',
  styleUrl: './layout-shell.css',
})
export class LayoutShell{

}
