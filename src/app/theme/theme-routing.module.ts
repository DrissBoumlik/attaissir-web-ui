import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards';

const routes: Routes = [
  {
    'path': '',
    'component': ThemeComponent,
    'canActivate': [AuthGuard],
    'children': [
      {
        path: 'index',
        loadChildren: './pages/default/index/index.module#IndexModule'
      },
      {
        path: '',
        loadChildren: '../modules/contracts/contracts.module#ContractsModule'
      },
      {
        path: '',
        loadChildren: '../modules/thirds/thirds.module#ThirdsModule'
      },
      {
        path: '',
        loadChildren: '../modules/cards/cards.module#CardsModule'
      },
      {
        path: '',
        loadChildren: '../modules/parcels/parcels.module#ParcelsModule'
      },
      {
        path: '',
        loadChildren: '../modules/warehouse/warehouse.module#WarehouseModule'
      },
      {
        path: '',
        loadChildren: '../modules/articles/articles.module#ArticlesModule'
      },
      {
        path: '404',
        loadChildren: './pages/default/not-found/not-found.module#NotFoundModule'
      },
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
