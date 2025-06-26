import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/shared/guard/auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'dashboard',loadChildren:()=> import('../components/dashboard/dashboard.module').then(m =>m.DashboardModule),canActivate:[AuthGuard]},
  {path:'auth',loadChildren:()=> import('../components/auth/auth.module').then(m=>m.AuthModule)},
  {path:'art',loadChildren:()=>import('../components/art-master/art-master.module').then(m=>m.ArtMasterModule)},
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
