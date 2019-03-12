import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.routing';
import { AuthComponent } from './auth.component';
import { AlertComponent } from './_directives/alert.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import {
    DxAutocompleteModule,
    DxButtonModule,
    DxCheckBoxModule, DxFormModule,
    DxLoadIndicatorModule, DxLoadPanelModule,
    DxNumberBoxModule, DxResponsiveBoxModule, DxScrollViewModule,
    DxSelectBoxModule
} from 'devextreme-angular';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AuthComponent,
        AlertComponent,
        LogoutComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AuthRoutingModule,
        DxLoadIndicatorModule,
        DxButtonModule,
        DxCheckBoxModule,
        DxSelectBoxModule,
        DxNumberBoxModule,
        DxScrollViewModule,
        DxAutocompleteModule,
        DxFormModule,
        ClarityModule,
        DxResponsiveBoxModule,
        DxLoadPanelModule
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
    ],
    entryComponents: [AlertComponent],
})

export class AuthModule {
}
