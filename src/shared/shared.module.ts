import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from './common/material.module';
import { SignupFormComponent } from './form/signup-form/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderComponent, SignupFormComponent],
  imports: [
    CommonModule,MaterialModule,ReactiveFormsModule
  ],
  exports:[HeaderComponent,MaterialModule,SignupFormComponent]
})
export class SharedModule { }
