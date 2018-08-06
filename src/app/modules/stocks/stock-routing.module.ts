import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ReplenishmentComponent } from './components/replenishment/replenishment.component';
import { AddComponent } from '../mouvements/components/add/add.component';
import { BoardComponent } from './components/board/board.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [{
  path: 'stock',
  component: DefaultComponent,
  children: [
    { path: '', component: BoardComponent, canActivate: [PermissionGuard], data: { permission: ['none'] } },
    { path: 'situation', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['none'] } },
    { path: 'reappro', component: ReplenishmentComponent, canActivate: [PermissionGuard], data: { permission: ['none'] } },
    { path: 'board', component: BoardComponent, canActivate: [PermissionGuard], data: { permission: ['none'] } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
