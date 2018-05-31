import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizardComponent } from './components/wizard/wizard.component';
import { DefaultComponent } from '../theme/pages/default/default.component';
import { ListContractComponent } from './components/list-contract/list-contract.component';
import {DetailContractComponent} from './components/detail-contract/detail-contract.component';

const routes: Routes = [
  {
    path: 'contrats',
    component: DefaultComponent,
    children: [
      { path: 'wizard', component: WizardComponent },
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
