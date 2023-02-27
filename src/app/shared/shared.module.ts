import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { HeaderComponent } from '../layouts/default/components/header/header.component';
import { SidebarComponent } from '../layouts/default/components/sidebar/sidebar.component';
import { AsideComponent } from '../layouts/default/components/aside/aside.component';
import { SidebarLogoComponent } from '../layouts/default/components/sidebar/sidebar-logo/sidebar-logo.component';
import { SidebarMenuComponent } from '../layouts/default/components/sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarFooterComponent } from '../layouts/default/components/sidebar/sidebar-footer/sidebar-footer.component';
import { AsideMenuComponent } from '../layouts/default/components/aside/aside-menu/aside-menu.component';
import { FooterComponent } from '../layouts/default/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AsideComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarMenuComponent,
    SidebarFooterComponent,
    FooterComponent,
    AsideMenuComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    InlineSVGModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
