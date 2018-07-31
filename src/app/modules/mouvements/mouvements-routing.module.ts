import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { ShowComponent } from './components/show/show.component';
import { ShowRetourComponent } from './components/show-retour/show-retour.component';



const routes: Routes = [
  {
    path: 'mouvements',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'liste',
        component: ListComponent
      },
      {
        path: 'ajouter',
        component: AddComponent
      },
      {
        path: 'afficher/:id',
        component: ShowComponent
      },
      {
        path: 'retour/:id',
        component: ShowRetourComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MouvementsRoutingModule { }
