import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';
import { ShowComponent } from './components/show/show.component';



const routes: Routes = [
  {
    path: 'demandes',
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
        path: 'afficher/:id',
        component: ShowComponent
      },

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandesRoutingModule { }
