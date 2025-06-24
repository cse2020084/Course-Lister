import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { MaterialModule } from './common/material.module';
import { SignupFormComponent } from './form/signup-form/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './form/registration-form/registration-form.component';
import { LoginComponent } from './form/login/login.component';
import { AuthContainerComponent } from './form/auth-container/auth-container.component';



@NgModule({
  declarations: [HeaderComponent, SignupFormComponent, RegistrationFormComponent, LoginComponent, AuthContainerComponent],
  imports: [
    CommonModule,MaterialModule,ReactiveFormsModule
  ],
  exports:[HeaderComponent,MaterialModule,SignupFormComponent,RegistrationFormComponent,AuthContainerComponent,LoginComponent]
})
export class SharedModule { }
