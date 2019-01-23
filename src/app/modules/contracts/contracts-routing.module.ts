import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';
import { ShowComponent } from './components/show/show.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListCurrentComponent } from './components/list-current/list-current.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [
    {
        path: 'contrats',
        children: [
            { path: '', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.contracts.grid'] } },
            { path: 'ajouter', component: AddComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.contracts.store'] } },
            { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.contracts.grid'] } },
            { path: 'liste/recherche/:name', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.contracts.grid'] } },
            { path: 'liste/courant', component: ListCurrentComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.contracts.grid'] } },
            { path: 'afficher/:id', component: ShowComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.contracts.grid'] } },
            { path: 'modifier/:id', component: EditComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.contracts.update'] } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContractsRoutingModule { }
