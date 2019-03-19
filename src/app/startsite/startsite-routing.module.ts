import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {StartsiteMainComponent} from './startsite-main/startsite-main.component';


const routes: Routes = [
  {path: '', component: StartsiteMainComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartsiteRoutingModule { }
