import { NgModule } from '@angular/core';
import { DarkenOnHoverModule } from '../shared/directives/darken-on-hover/darken-on-hover.module';
import { EpisListModule } from './epis/epi-list/epi-list.module';
import { EpiFormModule } from './epis/epi-form/epi-form.module';

@NgModule({
    imports: [ 
        DarkenOnHoverModule,
        EpisListModule,
        EpiFormModule
    ]
})
export class EpisModule {}