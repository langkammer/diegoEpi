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
import { FirebaseModuleImports } from './firebase/firebase.mdule';
import { EpisModule } from './epi/epis.module';
import { RouterModule } from '@angular/router';
import { ResultadoModule } from './resultado_teste/resultado.module';
import { BlockUIModule } from 'ng-block-ui';

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
    EpisModule,
    ResultadoModule,
    BlockUIModule.forRoot()

  ],
  exports : [
    FirebaseModuleImports,
    RouterModule,
    MyMaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
