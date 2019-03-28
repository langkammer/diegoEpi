import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [PrincipalComponent],
    imports: [
        CommonModule,
        NgbModule
    ],

})
export class PrincipalModule { }