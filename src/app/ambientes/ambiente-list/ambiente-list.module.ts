import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByDescription } from './filter-by-description.pipe';
import { CardModule } from '../../shared/components/card/card.module';
import { SearchComponent } from './search/search.component';
import { DarkenOnHoverModule } from '../../shared/directives/darken-on-hover/darken-on-hover.module';
import { AmbienteModule } from '../ambiente/ambiente.module';
import { AmbienteComponent } from '../ambiente/ambiente.component';
import { LoadButtonComponent } from './load-button/load-button.component';
import { AmbienteListComponent } from './ambiente-list.component';

@NgModule({
    declarations: [
        AmbienteListComponent,
        AmbienteComponent,
        LoadButtonComponent,
        FilterByDescription,
        SearchComponent
    ],
    imports: [ 
        CommonModule,
        AmbienteModule,
        CardModule, 
        DarkenOnHoverModule
    ]
})
export class AmbienteListModule {}