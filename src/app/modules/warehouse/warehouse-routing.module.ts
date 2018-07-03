import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ShowComponent } from './components/show/show.component';
import {ReplenishmentComponent} from './components/replenishment/replenishment.component';


const routes: Routes = [
  {
    path: 'magasin',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'ajouter',
        component: AddComponent
      },
      {
        path: 'modifier/:id',
        component: EditComponent
      },
      {
        path: 'afficher/:id',
        component: ShowComponent
      },
      {
        path: 'liste',
        component: ListComponent
      },
      {
        path: 'reapprovisionnement',
        component: ReplenishmentComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
