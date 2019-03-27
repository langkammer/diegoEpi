import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByDescription } from './filter-by-description.pipe';
import { CardModule } from '../../shared/components/card/card.module';
import { SearchComponent } from './search/search.component';
import { DarkenOnHoverModule } from '../../shared/directives/darken-on-hover/darken-on-hover.module';
import { AmbienteModule } from '../ambiente/ambiente.module';
import { LoadButtonComponent } from './load-button/load-button.component';
import { AmbienteListComponent } from './ambiente-list.component';
import { AmbientesComponent } from './ambientes/ambientes.component';

@NgModule({
    declarations: [
        AmbienteListComponent,
        AmbientesComponent,
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