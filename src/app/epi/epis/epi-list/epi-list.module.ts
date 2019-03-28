import { NgModule } from '@angular/core';
import { EpiListComponent } from './epi-list.component';
import { DarkenOnHoverModule } from 'src/app/shared/directives/darken-on-hover/darken-on-hover.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EpiListComponent
    ],
    imports: [ 
        CommonModule ,
        FormsModule,
        DarkenOnHoverModule
    ]
})
export class EpisListModule {}