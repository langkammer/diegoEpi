import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyMaterialModule } from './material-module';
import { ErrorsModule } from './errors/errors.module';
import { AppRoutingModule } from './app.routing.module';
import { AmbientesModule } from './ambientes/ambiente.module';
import { PrincipalModule } from './principal/principal.module';
import { LoginModule } from './login/login.module';
import { FirebaseModuleImports } from './firebase/firebase.mdule';
import { EpisModule } from './epi/epis.module';
import { RouterModule } from '@angular/router';
import { ResultadoModule } from './resultado_teste/resultado.module';
import { BlockUIModule } from 'ng-block-ui';
import { ResultadoListModule } from './resultado_teste/resultado-list/resultado-list.module';
import { NavComponent } from './nav-bar/nav.component';
import { NavModule } from './nav-bar/nav.module';

@NgModule({
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
    EpisModule,
    ResultadoModule,
    ResultadoListModule,
    NavModule,
    BlockUIModule.forRoot()

  ],
  exports : [
    FirebaseModuleImports,
    RouterModule,
    MyMaterialModule
  ],
  providers: [],
  bootstrap: [NavComponent]
})
export class AppModule { }
