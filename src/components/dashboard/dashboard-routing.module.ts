import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';


const routes: Routes = [
  {path:'',redirectTo:'menu',pathMatch:'full'},
  {path:'menu',component:MainPageComponent},
  {path:'sub-menu/:id',component:SubMenuComponent},
  {path:'**',redirectTo:'menu'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
