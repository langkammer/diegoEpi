import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AmbienteFormComponent } from './ambientes/ambiente-form/ambiente-form.component';
import { AmbienteListComponent } from './ambientes/ambiente-list/ambiente-list.component';
import { NgModule } from '@angular/core';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { EpiListComponent } from './epi/epis/epi-list/epi-list.component';
import { EpiFormComponent } from './epi/epis/epi-form/epi-form.component';
import { ResultadoComponent } from './resultado_teste/resultado.component';


const routes: Routes = [
    {
        path: 'login',
        component : LoginComponent
    },
    {
        path: 'home',
        component : PrincipalComponent
    },
    {
        path: '',
        component : PrincipalComponent
    },
    { 
        path: 'ambientes', 
        component: AmbienteListComponent
    },
    { 
        path: 'add-ambiente', 
        component: AmbienteFormComponent 
    },
    { 
        path: 'epis', 
        component: EpiListComponent
    },
    { 
        path: 'add-epi', 
        component: EpiFormComponent 
    },
    {
        path: 'resultado/:key',
        component: ResultadoComponent
    },
    { 
        path: '**', 
        component: NotFoundComponent 
    }  
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }

