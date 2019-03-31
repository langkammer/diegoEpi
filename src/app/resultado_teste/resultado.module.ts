import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../material-module';
import { ResultadoComponent } from './resultado.component';

@NgModule({
    declarations: [ResultadoComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        MyMaterialModule,
        ReactiveFormsModule
    
    ],

})
export class ResultadoModule { }