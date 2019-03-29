import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ambiente } from '../ambientes/ambiente/ambiente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'ap-principal',
    templateUrl: 'principal.component.html',
    styleUrls: ['./principal.component.css']

})
export class PrincipalComponent {
    baseurl : string = "https://firebasestorage.googleapis.com/v0/b/epifacildiego.appspot.com/o/ambientes%2F"
    ambiente: Ambiente[] = [];
    userName: string = '';

    isLinear = false;
    firstFormGroup: FormGroup;
  


    itemsRef: AngularFireList<any>;
    items: Observable<any[]>;
    
    images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);

    
    constructor(
        private activatedRoute: ActivatedRoute,
        db: AngularFireDatabase,
        private router: Router,
        private _formBuilder: FormBuilder
    
        ) { 
        this.itemsRef = db.list('ambientes');
    
        
        this.items =  this.itemsRef.snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
        console.log("ambientes...",this.items)  
      }

      ngOnInit(): void {
        this.userName = this.activatedRoute.snapshot.params.userName;
        this.ambiente = this.activatedRoute.snapshot.data['ambientes'];
    
        this.firstFormGroup = this._formBuilder.group({
          nome: ['', Validators.required]
        });

    
      }

      selecionarAmbiente(i){
        console.log(i);
      }
      


}