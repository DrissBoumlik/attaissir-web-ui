import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './components/new/new.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AddComponent } from './components/add/add.component';
import {AddTempleteComponent} from './components/add-templete/add-templete.component';

const routes: Routes = [{
  path: 'interventions',
  component: DefaultComponent,
  children: [
    { path: 'selectionner', component: NewComponent },
    { path: 'ajouter', component: AddComponent },
    { path: 'template/ajouter', component: AddTempleteComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventionsRoutingModule { }
