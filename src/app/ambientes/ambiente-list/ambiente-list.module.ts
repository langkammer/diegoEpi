import { NgModule } from '@angular/core';
import { DarkenOnHoverModule } from 'src/app/shared/directives/darken-on-hover/darken-on-hover.module';
import { AmbienteListComponent } from './ambiente-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AmbienteListComponent
    ],
    imports: [ 
        CommonModule ,
        FormsModule,
        DarkenOnHoverModule
    ]
})
export class AmbienteListModule {}