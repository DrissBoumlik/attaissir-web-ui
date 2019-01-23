import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './components/new/new.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { AddTempleteComponent } from './components/add-templete/add-templete.component';
// class hasPermissions implements CanActivate(){
// }
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [{
    path: 'interventions',
    children: [
        {
            path: 'selectionner',
            component: NewComponent,
            canActivate: [PermissionGuard],
            data: { permission: ['preconization.interventions.store'] }
        },
        {
            path: 'ajouter',
            component: AddComponent,
            canActivate: [PermissionGuard],
            data: { permission: ['preconization.interventions.store'] }
        },
        {
            path: 'template/ajouter',
            component: AddTempleteComponent,
            canActivate: [PermissionGuard],
            data: { permission: ['preconization.interventions.store'] }
        },
        {
            path: 'modifier/:id',
            component: EditComponent,
            canActivate: [PermissionGuard],
            data: { permission: ['preconization.articletemplates.grid'] }
        },
        {
            path: 'list',
            component: ListComponent,
            canActivate: [PermissionGuard],
            data: { permission: ['preconization.articletemplates.grid'] }
        },
        {
            path: 'appliquer-template-parcelle', component: AddTempleteComponent,
            canActivate: [PermissionGuard], data: { permission: ['preconization.articletemplates.store'] }
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InterventionsRoutingModule {
}
