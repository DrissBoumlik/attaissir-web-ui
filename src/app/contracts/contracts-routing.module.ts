import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WizardComponent} from './components/wizard/wizard.component';
import {DefaultComponent} from '../theme/pages/default/default.component';
import {ListContractComponent} from './components/list-contract/list-contract.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'wizard', component: WizardComponent },
      {path: 'list', component: ListContractComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
