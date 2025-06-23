import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtMasterRoutingModule } from './art-master-routing.module';
import { PaintingComponent } from './painting/painting.component';


@NgModule({
  declarations: [PaintingComponent],
  imports: [
    CommonModule,
    ArtMasterRoutingModule
  ]
})
export class ArtMasterModule { }
