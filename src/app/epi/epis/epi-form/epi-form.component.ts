import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'ap-epi-form',
  templateUrl: './epi-form.component.html',
  styleUrls: ['./epi-form.component.css']
})
export class EpiFormComponent implements OnInit {

  epi : any = {};

  arquivo : File;

  imgURL: any;
  
  itemsRef: AngularFireList<any>;

  uploadPercent: Observable<number>;

  downloadURL: Observable<string>;


  
  constructor(db: AngularFireDatabase,private storage: AngularFireStorage,private router: Router) {
    // this.items = db.list('ambientes').valueChanges();
    this.itemsRef = db.list('epis');

    // .collection<Ambiente>('ambientes');
  }

  ngOnInit(): void {
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
    console.log("epi") //s
    const task =  this.itemsRef.push(this.epi);
    task.then((value) => {
      //SUCCESS
      console.log(value);
      this.uploadFile(this.arquivo,value.key);
    }, (error) => {
        console.log(error);
    })
  }

  uploadFile(file,key) {
    const filePath = 'epis/'+key;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.vaiParaLista(fileRef.getDownloadURL()) )
     )
    .subscribe()
  }

  vaiParaLista(dow){
    this.downloadURL = dow;
    this.router.navigateByUrl('/epis');
  }
  

}
