import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ShowComponent } from './components/show/show.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';

const routes: Routes = [{
    path: 'articles',
    children: [
        { path: 'liste', component: ListComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.articlecategories.grid'] } },
        { path: 'afficher/:id', component: ShowComponent, canActivate: [PermissionGuard], data: { permission: ['distributionCenter.articlecategories.show'] } }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticlesRoutingModule { }
