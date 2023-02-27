import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { MsalModule, MsalRedirectComponent } from "@azure/msal-angular";

import { InlineSVGModule } from 'ng-inline-svg-2';


import { DefaultComponent } from './default.component';
import { ExtrasModule } from '../partials/layout/extras/extras.module';

import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PageTitleComponent } from './components/header/page-title/page-title.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarMenuComponent } from './components/sidebar/sidebar-menu/sidebar-menu.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';


import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ScriptsInitComponent } from './components/scripts-init/scripts-init.component';
import { ActiveInactivePipe } from 'src/app/shared/pipes/active-inactive/active-inactive.pipe';
import { NgApexchartsModule } from 'ng-apexcharts';

import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    ContentComponent,
    ToolbarComponent,
    PageTitleComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarMenuComponent,
    DashboardComponent,
    ScriptsInitComponent,
    ActiveInactivePipe,
  ],
  imports: [
    NgbModule,
    CommonModule,
    ExtrasModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    NgxSpinnerModule,
    BrowserModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InlineSVGModule,
    NgSelectModule,
    NgApexchartsModule
    
  ],
  exports:[ActiveInactivePipe]
})
export class DefaultModule { }
//class="app-default" id="kt_app_body" data-kt-app-layout="dark-sidebar" data-kt-app-header-fixed="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" data-kt-app-toolbar-enabled="true"
