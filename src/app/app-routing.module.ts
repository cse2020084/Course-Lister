import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'dashboard',loadChildren:()=> import('../components/dashboard/dashboard.module').then(m =>m.DashboardModule)},
  {path:'auth',loadChildren:()=> import('../components/auth/auth.module').then(m=>m.AuthModule)},
  {path:'**',redirectTo:'dashboard',pathMatch:'full'},
];
/**
 * Router combines parent + child paths
 * Navigation needs the complete combined path
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
