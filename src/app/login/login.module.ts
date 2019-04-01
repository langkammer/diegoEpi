import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
    declarations: [LoginComponent],
    imports: [ 
        CommonModule,
        FormsModule,
        BlockUIModule.forRoot()

     ]
})
export class LoginModule { }