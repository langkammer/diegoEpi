import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


import { Observable } from 'rxjs';
import { Ambiente } from '../ambiente/ambiente';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-ambiente-form',
  templateUrl: './ambiente-form.component.html',
  styleUrls: ['./ambiente-form.component.css']
})
export class AmbienteFormComponent implements OnInit {

  itemsCollection: AngularFirestoreCollection<Ambiente>;

  uploadPercent: Observable<number>;

  downloadURL: Observable<string>;

  ambiente : any = {};

  arquivo : File;

  imgURL: any;
  
  itemsRef: AngularFireList<any>;

  itemsPes: Observable<any[]>;
  itemsMaos: Observable<any[]>;
  itemsPeitoral: Observable<any[]>;
  itemsCabeca: Observable<any[]>;
  // items: Observable<any[]>;


  constructor(db: AngularFireDatabase,private storage: AngularFireStorage,private router: Router
    ) {
    // this.items = db.list('ambientes').valueChanges();
    this.itemsRef = db.list('ambientes');

    this.itemsPes = db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('CABECA'))
    .snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.itemsMaos = db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('MAOS'))
    .snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.itemsPeitoral = db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('PEITORAL'))
    .snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    this.itemsCabeca = db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('PES'))
    .snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
   


    // .collection<Ambiente>('ambientes');
  }

  ngOnInit() {
  }

  addAmbiente(item: Ambiente) {
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.arquivo = file;

        const reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
        }
    }
  }

  save() {
    console.log("ambiente") //s
    // console.log(this.itemsCollection)

    const task =  this.itemsRef.push(this.ambiente);
    task.then((value) => {
      //SUCCESS
      console.log(value);
      this.uploadFile(this.arquivo,value.key);
    }, (error) => {
        console.log(error);
    })
  }

  uploadFile(file,key) {
    const filePath = 'ambientes/'+key;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(
          () => this.vaiParaLista(fileRef.getDownloadURL() )
         )
     )
    .subscribe()
  }
  
  vaiParaLista(dow){
    this.downloadURL = dow;
    this.router.navigateByUrl('/ambientes');
  }
  

}
