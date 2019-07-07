import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ShowComponent } from './components/show/show.component';
import { ReplenishmentComponent } from './components/replenishment/replenishment.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';


const routes: Routes = [
    {
        path: 'magasin',
        children: [
            {
                path: '',
                component: ReplenishmentComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.warehouses.grid'] }
            },
            {
                path: 'modifier/:id',
                component: EditComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.warehouses.update'] }
            },
            {
                path: 'afficher/:id',
                component: ShowComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.warehouses.show'] }
            },
            {
                path: 'reapprovisionnement',
                component: ReplenishmentComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.warehouses.grid'] }
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WarehouseRoutingModule { }
