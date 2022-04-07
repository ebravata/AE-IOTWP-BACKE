import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NopageFoundComponent } from './pages/nopage-found/nopage-found.component';
import { OrgMenuComponent } from './pages/org-menu/org-menu.component';
import { PagesComponent } from './pages/pages.component';
import { ReportComponent } from './pages/report/report.component';
import { TableReportsComponent } from './pages/table-reports/table-reports.component';



const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'submenu', component: OrgMenuComponent},
      { path: 'calzreport/:ns', component: ReportComponent},
      { path: 'tablereports', component: TableReportsComponent},
      { path: 'logout', component: LogoutComponent},
      { path: '', redirectTo: '/login', pathMatch: 'full'}
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '**', component: NopageFoundComponent},

  ];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
