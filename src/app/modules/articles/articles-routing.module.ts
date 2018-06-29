import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { ListComponent } from './components/list/list.component';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [{
  path: 'articles',
  component: DefaultComponent,
  children: [
    { path: 'liste', component: ListComponent },
    { path: 'afficher/:id', component: ShowComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
