import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './components/list/list.component';
import {DefaultComponent} from '../../theme/pages/default/default.component';
import {ReplenishmentComponent} from './components/replenishment/replenishment.component';
import {BoardComponent} from './components/board/board.component';

const routes: Routes = [{
  path: 'stock',
  component: DefaultComponent,
  children: [
    { path: '', component: BoardComponent },
    { path: 'situation', component: ListComponent },
    { path: 'reappro', component: ReplenishmentComponent },
    { path: 'board', component: BoardComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
