import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { ListComponent } from './list/list.component';



@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ActivityRoutingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ListComponent]
})

export class ActivityModule { }



