import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaintingComponent } from './painting/painting.component';
import { AuthGuard } from 'src/shared/guard/auth.guard';


const routes: Routes = [
  {
    path:'painting',
    component:PaintingComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtMasterRoutingModule { }
