import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ReplenishmentComponent } from './components/replenishment/replenishment.component';
import { BoardComponent } from './components/board/board.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [{
    path: 'stock',
    children: [
        { path: '', component: BoardComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.stocks.grid'] } },
        { path: 'situation', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.stocks.grid'] } },
        { path: 'reappro', component: ReplenishmentComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.stocks.store'] } },
        { path: 'board', component: BoardComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.stocks.grid'] } },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockRoutingModule { }
