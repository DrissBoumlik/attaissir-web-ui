import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [{
    path: 'parcelles',
    children: [
        { path: 'add', component: AddComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.parcels.store'] } },
        { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.parcels.grid'] } },
        { path: 'afficher/:id', component: ShowComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.contracts.grid'] } },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParcelsRoutingModule { }
