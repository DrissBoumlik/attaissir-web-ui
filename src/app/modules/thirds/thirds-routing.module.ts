import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ListComponent as WarehouseListComponent } from './components/warehouse-list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ShowComponent } from './components/show/show.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [
    {
        path: 'tiers',
        children: [
            {
                path: '',
                component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['thirdParty.third-parties.grid'] }
            },
            {
                path: 'ajouter',
                component: AddComponent, canActivate: [PermissionGuard], data: { permission: ['thirdParty.third-parties.store'] }
            },
            {
                path: 'modifier/:id',
                component: EditComponent, canActivate: [PermissionGuard], data: { permission: ['thirdParty.third-parties.update'] }
            },
            {
                path: 'afficher/:id',
                component: ShowComponent, canActivate: [PermissionGuard], data: { permission: ['thirdParty.third-parties.show'] }
            },
            {
                path: 'liste',
                component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['thirdParty.third-parties.grid'] }
            },
            {
                path: 'liste/recherche/:name',
                component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['thirdParty.third-parties.grid'] }
            }
        ]
    },
    {
        path: 'jeunepromoteurs',
        children: [
            {
                path: '',
                component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.warehouses.grid'] }
            },
            {
                path: 'ajouter',
                component: AddComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.warehouses.store'] }
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
                path: 'liste',
                component: WarehouseListComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.warehouses.grid'] }
            },
            {
                path: 'liste/recherche/:name',
                component: WarehouseListComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.warehouses.grid'] }
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThirdsRoutingModule { }
