import { NgModule } from '@angular/core';
import { AmbienteComponent } from './ambiente.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AmbienteComponent],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [ AmbienteComponent ]
})
export class AmbienteModule { }