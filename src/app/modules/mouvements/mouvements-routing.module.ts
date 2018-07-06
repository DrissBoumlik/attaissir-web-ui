import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';
import {AddComponent} from './components/add/add.component';



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
      { path: 'ajouter', component: AddComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MouvementsRoutingModule { }
