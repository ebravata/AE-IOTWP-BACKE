import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrgMenuComponent } from './pages/org-menu/org-menu.component';
import { NopageFoundComponent } from './pages/nopage-found/nopage-found.component';
import { AppRoutingModule } from './app-routing.module';
import { BreadbrumbsComponent } from './shared/breadbrumbs/breadbrumbs.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { PagesComponent } from './pages/pages.component';
import { ReportComponent } from './pages/report/report.component';
import { PlotlyGraphComponent } from './components/plotly-graph/plotly-graph.component';
import { TableReportsComponent } from './pages/table-reports/table-reports.component';
import { ModalGraphsComponent } from './components/modal-graphs/modal-graphs.component';
import { LogoutComponent } from './auth/logout/logout.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    OrgMenuComponent,
    NopageFoundComponent,
    BreadbrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    PagesComponent,
    ReportComponent,
    PlotlyGraphComponent,
    TableReportsComponent,
    ModalGraphsComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
