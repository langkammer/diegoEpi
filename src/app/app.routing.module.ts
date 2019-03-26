import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AmbienteFormComponent } from './ambientes/ambiente-form/ambiente-form.component';
import { AmbienteListComponent } from './ambientes/ambiente-list/ambiente-list.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    { 
        path: 'ambiente/lista', 
        component: AmbienteListComponent
    },
    { 
        path: 'ambiente/add', 
        component: AmbienteFormComponent 
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

