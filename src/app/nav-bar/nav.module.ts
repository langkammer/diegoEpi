import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app.routing.module';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
    declarations: [NavComponent],
    imports: [ 
        CommonModule,
        FormsModule ,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        BlockUIModule.forRoot()
     ]
})
export class NavModule { }