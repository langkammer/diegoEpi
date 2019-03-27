import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MyMaterialModule } from './material-module';
import { ErrorsModule } from './errors/errors.module';
import { AppRoutingModule } from './app.routing.module';
import { AmbientesModule } from './ambientes/ambiente.module';
import { PrincipalModule } from './principal/principal.module';
import { LoginModule } from './login/login.module';
import { EpiModule } from './epi/epi.module';
import { FirebaseModuleImports } from './firebase/firebase.mdule';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AmbientesModule,
    MyMaterialModule,
    FirebaseModuleImports,
    AppRoutingModule,
    ErrorsModule,
    PrincipalModule,
    LoginModule,
    EpiModule
  ],
  exports : [
    FirebaseModuleImports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
