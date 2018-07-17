import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';

const routes: Routes = [{
  path: 'parcelles',
  component: DefaultComponent,
  children: [
    { path: 'add', component: AddComponent },
    { path: 'liste', component: ListComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcelsRoutingModule { }
