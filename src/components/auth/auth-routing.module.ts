import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {
    path:'',redirectTo:'signup',pathMatch:'full'
  },
  {
  path:'signup',component:SignupComponent
  },
  {
    path:'**',redirectTo:'signup',pathMatch:'full'
  }
];

/**
 * Router combines parent + child paths
 * Navigation needs the complete combined path
 */

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
