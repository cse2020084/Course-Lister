import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from './common/material.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,MaterialModule
  ],
  exports:[HeaderComponent,MaterialModule]
})
export class SharedModule { }
