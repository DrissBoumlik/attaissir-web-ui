import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { PermissionGuard } from '../../shared/directives/guard.directive';
import { IndexComponent } from './index/index.component';

const routes: Routes = [{
  path: 'import',
  component: DefaultComponent,
  children: [
    { path: 'index', component: IndexComponent, canActivate: [PermissionGuard], data: { permission: ['none'] } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
