import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from "./components/index/index.component";
import { CardGeneratorRoutingModule } from "./card-generator-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { CardsRoutingModule } from "../cards/cards-routing.module";
import {
    DxSelectBoxModule, DxFormModule, DxListModule, DxButtonModule, DxDataGridModule,
    DxTextBoxModule, DxDateBoxModule, DxPopupModule, DxTemplateModule, DxLoadIndicatorModule, DxGalleryModule,
    DxCheckBoxModule
} from "devextreme-angular";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        CardsRoutingModule,
        DxSelectBoxModule,
        DxFormModule,
        DxListModule,
        DxButtonModule,
        DxDataGridModule,
        DxTextBoxModule,
        DxLoadIndicatorModule,
        DxDateBoxModule,
        FormsModule,
        DxPopupModule,
        DxTemplateModule,
        DxGalleryModule,
        DxCheckBoxModule,
        CardGeneratorRoutingModule

    ],
    declarations: [IndexComponent]
})
export class CardGeneratorModule { }
