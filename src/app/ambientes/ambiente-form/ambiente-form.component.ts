import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';



import { Observable } from 'rxjs';

@Component({
  selector: 'ap-ambiente-form',
  templateUrl: './ambiente-form.component.html',
  styleUrls: ['./ambiente-form.component.css']
})
export class AmbienteFormComponent implements OnInit {
  itemsCollection: AngularFirestoreCollection<Ambiente>;
  items: Observable<Ambiente[]>;

  ambiente : any = {};
  
  constructor(db: AngularFirestore) {
    this.itemsCollection = db.collection<Ambiente>('ambientes');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
  }

  addAmbiente(item: Ambiente) {
  }

  save() {
    console.log("ambiente")
    console.log(this.itemsCollection)
    this.itemsCollection.add(this.ambiente);
  }
  

}
