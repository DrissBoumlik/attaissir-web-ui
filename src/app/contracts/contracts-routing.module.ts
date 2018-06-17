import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';
import { ShowComponent } from './components/show/show.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent as ListParcelsComponent } from './components/list-parcels/list.component';
import { ListCurrentComponent } from './components/list-current/list-current.component';

const routes: Routes = [
  {
    path: 'contrats',
    component: DefaultComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'ajouter', component: AddComponent },
      { path: 'liste', component: ListComponent },
      { path: 'liste/courant', component: ListCurrentComponent },
      { path: 'afficher/:id', component: ShowComponent },
      { path: 'modifier/:id', component: EditComponent },
      { path: 'parcelles', component: ListParcelsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
