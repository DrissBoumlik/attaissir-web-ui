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
      { 
        path: '', 
        component: ListComponent,
        data: { title: 'Heroes List' } 
      },
      { 
        path: 'add', 
        component: AddComponent,
        data: { title: 'Heroes List' }
        },
      { 
        path: 'edit/:id', 
        component: EditComponent,
        data: { title: 'Heroes List' }
      },
      { 
        path: 'show/:id', 
        component: ShowComponent,
        data: { title: 'Heroes List' }
      },
      { 
        path: 'list', 
        component: ListComponent,
        data: { title: 'Heroes List' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThirdsRoutingModule { }
