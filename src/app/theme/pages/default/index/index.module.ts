import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent as IndexComponent1 } from './index.component';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { SharedModule } from '../../../../shared/shared.module';
import {DashboardModule} from '../dashboard/index.module';

const routes: Routes = [
  {
    'path': '',
    'component': DefaultComponent,
    'children': [
      {
        'path': '',
        'component': IndexComponent1
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule, SharedModule, DashboardModule
  ], exports: [
    RouterModule
  ], declarations: [
    IndexComponent1
  ]
})
export class IndexModule {}
