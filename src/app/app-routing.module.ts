import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './auth/logout/logout.component';


const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: './auth/auth.module#AuthModule',
    data: { title: 'Heroes List' }
    
  },
  { 
    path: 'logout', 
    component: LogoutComponent,
    data: { title: 'Heroes List' } 
    
  },
  { 
    path: '', 
    redirectTo: 'index', 
    pathMatch: 'full',
    data: { title: 'Heroes List' }
  
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
