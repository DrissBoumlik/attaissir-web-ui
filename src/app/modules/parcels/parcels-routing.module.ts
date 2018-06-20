import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [{
  path: 'parcelles',
  component: DefaultComponent,
  children: [
    { path: 'liste', component: ListComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcelsRoutingModule { }
