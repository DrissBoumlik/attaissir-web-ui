import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [{
  path: 'utilisateurs',
  component: DefaultComponent,
  children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'ajouter', component: AddComponent },
    { path: 'liste', component: ListComponent },
    { path: 'modifier/:id', component: EditComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
