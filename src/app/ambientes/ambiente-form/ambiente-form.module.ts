import { NgModule } from '@angular/core';
import { AmbienteFormComponent } from './ambiente-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AmbienteFormComponent],
    imports: [ 
        CommonModule ,
        FormsModule
    ]
})
export class AmbienteFormModule { }