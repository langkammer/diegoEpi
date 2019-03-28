import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Epi } from '../Epi';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-epi-list',
  templateUrl: './epi-list.component.html',
  styleUrls: ['./epi-list.component.css']
})
export class EpiListComponent implements OnInit {

  epi: Epi[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  baseurl : string = "https://firebasestorage.googleapis.com/v0/b/epifacildiego.appspot.com/o/epis%2F"

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    db: AngularFireDatabase,
  ) { 
    this.itemsRef = db.list('epis');

    this.items =  this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    console.log("ambientes...",this.items)  

  }

  vaiParaAdd= function () {
    this.router.navigateByUrl('/add-epi');
  };

  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.epi = this.activatedRoute.snapshot.data['epis'];
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
}
