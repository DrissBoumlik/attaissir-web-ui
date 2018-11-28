import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, Injector, LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeComponent } from './theme/theme.component';
import { createCustomElement } from '@angular/elements';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeRoutingModule } from './theme/theme-routing.module';
import { AuthModule } from './auth/auth.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './shared/interceptors/token.interceptors';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  DxCheckBoxModule,
  DxDataGridModule,
  DxFileUploaderModule,
  DxLookupModule,
  DxPivotGridModule,
  DxPopupModule,
  DxRadioGroupModule,
  DxSelectBoxModule,
  DxSwitchModule,
  DxTemplateModule
} from 'devextreme-angular';

import { SiamErrorHandler } from './shared/classes/siam-error-handler';
import { ParcelsModule } from './modules/parcels/parcels.module';
import { CardsModule } from './modules/cards/cards.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContractsModule } from './modules/contracts/contracts.module';
import { ThirdsModule } from './modules/thirds/thirds.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { MouvementsModule } from './modules/mouvements/mouvements.module';
import { InterventionsModule } from './modules/interventions/interventions.module';
import { DemandesModule } from './modules/demandes/demandes.module';
import { UsersModule } from './modules/users/users.module';
import { CardGeneratorModule } from './modules/card-generator/card-generator.module';
import { PermissionGuard } from './shared/directives/guard.directive';
import { ParcelInfoComponent } from './shared/components/parcel-info/parcel-info.component';
import { TodosComponent } from './modules/incidents/components/todos/todos.component';
import {CounterUpModule} from 'angular4-counter-up';
import {ActivityModule} from './modules/activity/activity.module';
import {ImportModule} from './modules/import/import.module';

@NgModule({
  declarations: [
    ThemeComponent,
    AppComponent
  ],
  imports: [
    LayoutModule,
    BrowserModule,



    AppRoutingModule,
    ThemeRoutingModule,

    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    DxTemplateModule,
    DxDataGridModule,
    DxPopupModule,
    DxLookupModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    DxSwitchModule,
    DxRadioGroupModule,
    ToastrModule.forRoot(),
    DxPivotGridModule,

    NgbModule.forRoot(),
    InterventionsModule,
    AuthModule,
    ThirdsModule,
    ContractsModule,
    ParcelsModule,
    CardsModule,
    DemandesModule,
    ArticlesModule,
    ActivityModule,
    ImportModule,
    SharedModule,
    MouvementsModule,
    CardGeneratorModule,
    UsersModule
  ],
  exports: [
    DxDataGridModule,
    DxPopupModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    FormsModule,
    DxPivotGridModule,
    DxTemplateModule,
    DxCheckBoxModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    },
    ScriptLoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: SiamErrorHandler
    },
    PermissionGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
}
