import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../theme/pages/default/default.component';
import { ListContractComponent } from './components/list-contract/list-contract.component';
import { DetailContractComponent } from './components/detail-contract/detail-contract.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { CardsComponent } from './components/cards/cards.component';

const routes: Routes = [
  {
    path: 'contrats',
    component: DefaultComponent,
    children: [
      { path: '', component: ListContractComponent },
      { path: 'ajouter', component: AddComponent },
      { path: 'liste', component: ListContractComponent },
      { path: 'afficher/:id', component: DetailContractComponent },
      { path: 'modifier/:id', component: EditComponent },
      { path: 'cards', component: CardsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
