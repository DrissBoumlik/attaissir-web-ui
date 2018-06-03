import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ShowComponent } from './components/show/show.component';
import { IndexComponent } from './components/index/index.component';
import { DefaultComponent } from '../theme/pages/default/default.component';

const routes: Routes = [
  {
    path: 'tiers',
    component: DefaultComponent,
    children: [
      { path: '', component: ListComponent/*IndexComponent*/ },
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'show/:id', component: ShowComponent },
      { path: 'list', component: ListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdsRoutingModule { }
