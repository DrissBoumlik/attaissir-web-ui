import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewComponent} from './components/new/new.component';
import {DefaultComponent} from '../../theme/pages/default/default.component';
import {AddComponent} from './components/add/add.component';

const routes: Routes = [{
  path: 'interventions',
  component: DefaultComponent,
  children: [
    { path: 'ajouter', component: AddComponent },
    { path: 'rechercher', component: NewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventionsRoutingModule { }
