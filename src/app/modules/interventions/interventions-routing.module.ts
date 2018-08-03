import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NewComponent } from './components/new/new.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { AddTempleteComponent } from './components/add-templete/add-templete.component';
import {AuthGuard} from '../../_directives/guard.directive';

// class hasPermissions implements CanActivate(){
  
// }

const routes: Routes = [{
  path: 'interventions',
  component: DefaultComponent,
  children: [
    { path: 'selectionner', component: NewComponent },
    { path: 'ajouter', component: AddComponent },
    { path: 'template/ajouter', component: AddTempleteComponent },
    { path: 'liste', component: ListComponent },
    { path: 'modifier/:id', component: EditComponent },
    { path: 'appliquer-template-parcelle', component: AddTempleteComponent, canActivate : [AuthGuard] , data: { permission: ['base.structures.destroy']} },
    { path: 'list', component: ListComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InterventionsRoutingModule { }
