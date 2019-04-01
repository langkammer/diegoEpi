import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-resultado-list',
  templateUrl: './resultado-list.component.html'
})
export class ResultadoListComponent {



  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(
    private router: Router,
    db: AngularFireDatabase,
  ) { 
    this.itemsRef = db.list('resultados');

    this.items =  this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  vaiParaAdd= function (key) {
    this.router.navigate(["/resultado",key]);
  };

  
}
