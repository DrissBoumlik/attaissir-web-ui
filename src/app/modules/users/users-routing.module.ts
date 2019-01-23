import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';

import { ProfileComponent } from './components/profile/profile.component';
import { EditComponent } from './components/edit/edit.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [{
    path: 'utilisateurs',
    children: [
        /* { path: 'profile', component: ProfileComponent, canActivate: [PermissionGuard], data: { permission: ['none'] } }, */
        { path: 'ajouter', component: AddComponent, canActivate: [PermissionGuard], data: { permission: ['user.users.store'] } },
        { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['user.users.index'] } },
        { path: 'modifier/:id', component: EditComponent, canActivate: [PermissionGuard], data: { permission: ['user.users.update'] } }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
