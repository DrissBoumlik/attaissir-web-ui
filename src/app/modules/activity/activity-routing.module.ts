import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import {ListComponent} from './list/list.component';
import {IndexComponent} from '../card-generator/components/index/index.component';




const routes: Routes = [{
  path: 'activity',
  component: DefaultComponent,
  children: [
    { path: 'index', component: ListComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
