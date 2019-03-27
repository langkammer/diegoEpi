import { NgModule } from '@angular/core';
import { DarkenOnHoverModule } from '../shared/directives/darken-on-hover/darken-on-hover.module';
import { AmbienteFormModule } from './ambiente-form/ambiente-form.module';
import { AmbienteListModule } from './ambiente-list/ambiente-list.module';
import { AmbienteModule } from './ambiente/ambiente.module';

@NgModule({
    imports: [ 
        AmbienteModule,
        AmbienteFormModule,
        AmbienteListModule,
        DarkenOnHoverModule
    ]
})
export class AmbientesModule {}