import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { SuiviComponent } from './suivi/suivi.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'suivi',
      component: SuiviComponent,
      canActivate: [PermissionGuard],
      data: { permission: ['agreement.contracts.grid'] }
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartographieRoutingModule { }
