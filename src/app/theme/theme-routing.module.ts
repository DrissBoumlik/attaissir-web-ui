import { NgModule } from '@angular/core';
import { ThemeComponent } from './theme.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/_guards';
import { PermissionDeniedModule } from './pages/default/permission-denied/permission-denied.module';

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
        loadChildren: '../modules/reporting/reporting.module#ReportingModule'
      },
      {
        path: 'dash',
        loadChildren: './pages/default/dashboard/index.module#DashboardModule'
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
        loadChildren: '../modules/field-states/field-states.module#FieldStatesModule'
      },
      {
        path: '',
        loadChildren: '../modules/incidents/incidents.module#IncidentsModule'
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
        path: '',
        loadChildren: '../modules/stocks/stock.module#StockModule'
      },
      {
        path: '',
        loadChildren: '../modules/mouvements/mouvements.module#MouvementsModule'
      },
      {
        path: '',
        loadChildren: '../modules/demandes/demandes.module#DemandesModule'
      },
      {
        path: '',
        loadChildren: '../modules/preconisations-intrants/preconisations-intrants.module#PreconisationsIntrantsModule'
      },
      {
        path: '',
        loadChildren: '../modules/interventions/interventions.module#InterventionsModule'
      },
      {
        path: '',
        loadChildren: '../modules/preconisations-intrants/preconisations-intrants.module#PreconisationsIntrantsModule'
      },
      {
        path: '',
        loadChildren: '../modules/interventions/interventions.module#InterventionsModule'
      },
      {
        path: '',
        loadChildren: '../modules/users/users.module#UsersModule'
      },
      {
        path: '',
        loadChildren: '../modules/roles/roles.module#RolesModule'
      },
      {
        path: '',
        loadChildren: '../modules/card-generator/card-generator.module#CardGeneratorModule'
      }
      ,
      {
        path: '404',
        loadChildren: './pages/default/not-found/not-found.module#NotFoundModule'
      },
      {
        path: '403',
        loadChildren: './pages/default/permission-denied/permission-denied.module#PermissionDeniedModule'
      },
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'carte',
    loadChildren: '../modules/cartographie/cartographie.module#CartographieModule'
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
