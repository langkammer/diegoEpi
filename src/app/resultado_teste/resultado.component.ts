import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ap-resultado',
    templateUrl: 'resultado.component.html'

})
export class ResultadoComponent {

    resultado = {};

    constructor(private route:ActivatedRoute, private router:Router){
        console.log(route.snapshot.data);

    }
    

}