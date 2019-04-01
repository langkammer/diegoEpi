import { NgModule } from '@angular/core';
import { DarkenOnHoverModule } from 'src/app/shared/directives/darken-on-hover/darken-on-hover.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultadoListComponent } from './resultado-list.component';

@NgModule({
    declarations: [
        ResultadoListComponent
    ],
    imports: [ 
        CommonModule ,
        FormsModule,
        DarkenOnHoverModule
    ]
})
export class ResultadoListModule {}