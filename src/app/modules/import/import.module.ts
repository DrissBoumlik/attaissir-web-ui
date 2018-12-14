import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { ImportRoutingModule } from './import-routing.module';
import {
  DxButtonModule, DxCheckBoxModule, DxFileUploaderModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxSelectBoxModule, DxSwitchModule,
  DxTemplateModule,
  DxTextAreaModule, DxTextBoxModule, DxValidationSummaryModule, DxValidatorModule
} from 'devextreme-angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ImportRoutingModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxPopupModule,
    DxButtonModule,
    DxTemplateModule,
    DxSwitchModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxLoadPanelModule,

    DxCheckBoxModule,
    DxFileUploaderModule,
    DxSelectBoxModule
  ],
  declarations: [IndexComponent]
})
export class ImportModule { }
