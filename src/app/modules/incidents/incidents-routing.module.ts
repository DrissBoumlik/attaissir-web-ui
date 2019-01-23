import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [{
    path: 'incidents',
    children: [
        { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } },
        { path: 'todos', component: TodosComponent, canActivate: [PermissionGuard], data: { permission: ['preconization.incidents.grid'] } }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IncidentsRoutingModule { }
