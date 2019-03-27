import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ambiente } from '../../ambiente/ambiente';


@Component({
  selector: 'ap-ambientes',
  templateUrl: './ambientes.component.html',
  styleUrls: ['./ambientes.component.css']
})
export class AmbientesComponent implements OnChanges {
  
  @Input() ambientes: Ambiente[] = [];
  rows: any[] = [];
  
  constructor() { }
  
  ngOnChanges(changes: SimpleChanges) {
    if(changes.photos) 
      this.rows = this.groupColumns(this.ambientes);
  }

  groupColumns(ambientes: Ambiente[]) {
    const newRows = [];

    for(let index = 0; index < ambientes.length; index+=3) {
      newRows.push(ambientes.slice(index, index + 3));
    }                            
    return newRows;
  }
}