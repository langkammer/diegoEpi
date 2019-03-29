import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MyMaterialModule } from '../material-module';

@NgModule({
    declarations: [PrincipalComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        MyMaterialModule,
        ReactiveFormsModule
    
    ],

})
export class PrincipalModule { }