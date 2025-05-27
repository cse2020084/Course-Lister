import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SignupFormComponent } from 'src/shared/form/signup-form/signup-form.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
