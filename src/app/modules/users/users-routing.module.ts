import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DefaultComponent} from '../../theme/pages/default/default.component';
import {AddComponent} from './components/add/add.component';

const routes: Routes = [{
  path: 'utilisateurs',
  component: DefaultComponent,
  children: [
    {path: 'liste', component: AddComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
