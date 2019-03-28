import { Component, Input } from '@angular/core';	

	
@Component({
     selector: 'ap-ambiente',
     templateUrl: 'ambiente.component.html'
})
export class AmbienteComponent {	

     @Input() description = '';	

     @Input() url='';	
} 