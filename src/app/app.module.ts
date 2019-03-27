import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { MyMaterialModule } from './material-module';
import { ErrorsModule } from './errors/errors.module';
import { AppRoutingModule } from './app.routing.module';
import { AmbientesModule } from './ambientes/ambiente.module';
import { environment } from './environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AmbientesModule,
    MyMaterialModule,
    AppRoutingModule,
    ErrorsModule,
    AngularFireModule.initializeApp(environment.firebase)

    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
