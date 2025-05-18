import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  {path:'',redirectTo:'menu',pathMatch:'full'},
  {path:'menu',component:MainPageComponent},
  {path:'**',redirectTo:'menu'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
