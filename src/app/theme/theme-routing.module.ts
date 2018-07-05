import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards';
import {MouvementsModule} from '../modules/mouvements/mouvements.module';
import {ListeDesDemandesModule} from '../modules/liste_des_demandes/liste-des-demandes.module';

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
        loadChildren: '../modules/commande/commande.module#CommandeModule'
      },
      {
        path: '',
        loadChildren: '../modules/articles/articles.module#ArticlesModule'
      },
      {
        path: '',
        loadChildren: '../modules/mouvements/mouvements.module#MouvementsModule'
      },
      {
        path: '',
        loadChildren: '../modules/liste_des_demandes/liste-des-demandes.module#ListeDesDemandesModule'
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
