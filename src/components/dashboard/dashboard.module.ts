import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { MaterialModule } from 'src/shared/common/material.module';
import { SharedModule } from 'src/shared/shared.module';
import { SubMenuComponent } from './sub-menu/sub-menu.component';


@NgModule({
  declarations: [MainPageComponent, SubMenuComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // MaterialModule,
    SharedModule
  ]
})
export class DashboardModule { }
