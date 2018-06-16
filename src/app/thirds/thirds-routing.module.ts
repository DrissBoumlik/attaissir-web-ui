import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ShowComponent } from './components/show/show.component';
import { DefaultComponent } from '../theme/pages/default/default.component';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
  {
    path: 'tiers',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: { title: 'Heroes List' }
      },
      {
        path: 'ajouter',
        component: AddComponent,
        data: { title: 'Heroes List' }
      },
      {
        path: 'modifier/:id',
        component: EditComponent
      },
      {
        path: 'afficher/:id',
        component: ShowComponent,
        data: { title: 'Heroes List' }
      },
      {
        path: 'liste',
        component: ListComponent,
        data: { title: 'Heroes List' }
      },
      { path: 'cartes', component: CardsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdsRoutingModule { }
