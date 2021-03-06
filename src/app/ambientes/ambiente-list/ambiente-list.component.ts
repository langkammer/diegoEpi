import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Ambiente } from '../ambiente/ambiente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ambiente-list',
  templateUrl: './ambiente-list.component.html',
  styleUrls: ['./ambiente-list.component.css']
})
export class AmbienteListComponent implements OnInit {

  baseurl : string = "https://firebasestorage.googleapis.com/v0/b/epifacildiego.appspot.com/o/ambientes%2F"
  ambiente: Ambiente[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;




  constructor(
    private activatedRoute: ActivatedRoute,
    db: AngularFireDatabase,
    private router: Router

    ) { 
    this.itemsRef = db.list('ambientes');

    
    this.items =  this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    console.log("ambientes...",this.items)  
  }

  vaiParaAdd= function () {
    this.router.navigateByUrl('/add-ambiente');
  };

  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.ambiente = this.activatedRoute.snapshot.data['ambientes'];



  }

}
