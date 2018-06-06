import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeComponent } from './theme/theme.component';
import { LayoutModule } from './theme/layouts/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeRoutingModule } from './theme/theme-routing.module';
import { AuthModule } from './auth/auth.module';
import { ScriptLoaderService } from './_services/script-loader.service';
import { ThirdsModule } from './thirds/thirds.module';
import { ToastrModule } from 'ngx-toastr';
import { ContractsModule } from './contracts/contracts.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import {TokenInterceptor} from './auth/_services/token.interceptors';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  DxDataGridModule,
  DxFileUploaderModule,
  DxLookupModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTemplateModule
} from 'devextreme-angular';

@NgModule({
  declarations: [
    ThemeComponent,
    AppComponent
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeRoutingModule,
    HttpClientModule,
    ThirdsModule,
    AuthModule,
    ContractsModule,
    SharedModule,
    DxTemplateModule,
    DxDataGridModule,
    DxPopupModule,
    DxLookupModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    DxTemplateModule,
    DxDataGridModule,
    DxPopupModule,
    DxFileUploaderModule,
    DxSelectBoxModule,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr'
  },
    ScriptLoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
