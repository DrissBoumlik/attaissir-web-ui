import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../theme/pages/default/default.component';
import { ListContractComponent } from './components/list-contract/list-contract.component';
import { DetailContractComponent } from './components/detail-contract/detail-contract.component';
import { AddComponent } from './components/add/add.component';

const routes: Routes = [
  {
    path: 'contrats',
    component: DefaultComponent,
    children: [
      { path: '', component: ListContractComponent },
      { path: 'add', component: AddComponent },
      { path: 'list', component: ListContractComponent },
      { path: 'show/:id', component: DetailContractComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
