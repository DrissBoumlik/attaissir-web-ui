import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [{
    path: 'cartes',
    children: [
        { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['agreement.cards.index'] } }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CardsRoutingModule { }
