import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { IndexComponent } from "./components/index/index.component";

const routes: Routes = [{
  path: 'carte-generateur',
  component: DefaultComponent,
  children: [
    { path: 'index', component: IndexComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardGeneratorRoutingModule { }
