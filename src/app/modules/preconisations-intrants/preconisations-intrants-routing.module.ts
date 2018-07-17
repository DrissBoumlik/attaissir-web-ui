import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import {ShowComponent} from './components/show/show.component';

const routes: Routes = [
  {
    path: 'preconisations-intrants',
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
        path: 'liste/:cin',
        component: ListComponent
      },
      {
        path: 'afficher/:id',
        component: ShowComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreconisationsIntrantsRoutingModule { }
