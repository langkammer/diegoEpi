import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AmbienteComponent } from './ambiente.component';

@NgModule({
    declarations: [AmbienteComponent],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [ AmbienteComponent ]
})
export class AmbienteModule { }