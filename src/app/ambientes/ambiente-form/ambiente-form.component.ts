import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';



import { Ambiente } from '../ambiente/ambiente';
import { Observable } from 'rxjs';

@Component({
  selector: 'ap-ambiente-form',
  templateUrl: './ambiente-form.component.html',
  styleUrls: ['./ambiente-form.component.css']
})
export class AmbienteFormComponent implements OnInit {
  itemRef: AngularFireObject<any>;
  item: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.itemRef = db.object('ambientes');
    this.item = this.itemRef.valueChanges();
  }

  ngOnInit() {
  }

  addAmbiente(item: Ambiente) {
  }

  save() {
    console.log("ambiente")
    // this.itemRef.set({ name: newName });
  }
  update(newSize: string) {
    this.itemRef.update({ size: newSize });
  }
  delete() {
    this.itemRef.remove();
  }

}
