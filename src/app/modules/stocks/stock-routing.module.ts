import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './components/list/list.component';
import {DefaultComponent} from '../../theme/pages/default/default.component';
import {ReplenishmentComponent} from './components/replenishment/replenishment.component';
import {AddComponent} from '../mouvements/components/add/add.component';

const routes: Routes = [{
  path: 'stock',
  component: DefaultComponent,
  children: [
    { path: '', component: ListComponent },
    { path: 'situation', component: ListComponent },
    { path: 'reappro', component: ReplenishmentComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
