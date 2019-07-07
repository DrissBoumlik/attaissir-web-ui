import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { ShowComponent } from './components/show/show.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ArticlesRoutingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ListComponent, ShowComponent]
})
export class ArticlesModule { }
