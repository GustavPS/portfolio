import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartsiteRoutingModule } from './startsite-routing.module';
import { AboutMeComponent } from './about-me/about-me.component';
import { StartsiteMainComponent } from './startsite-main/startsite-main.component';

@NgModule({
  declarations: [AboutMeComponent, StartsiteMainComponent],
  imports: [
    CommonModule,
    StartsiteRoutingModule
  ]
})
export class StartsiteModule { }
