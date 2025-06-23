import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaintingComponent } from './painting/painting.component';


const routes: Routes = [
  {
    path:'painting',
    component:PaintingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtMasterRoutingModule { }
