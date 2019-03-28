import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpiFormComponent } from './epi-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [EpiFormComponent],
    imports: [ 
        CommonModule,
        FormsModule 
    ]
})
export class EpiFormModule { }