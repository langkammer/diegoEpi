import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Ambiente } from '../ambientes/ambiente/ambiente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { transferArrayItem, CdkDragDrop, moveItemInArray, CdkDrag } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ap-principal',
    templateUrl: 'principal.component.html',
    styleUrls: ['./principal.component.css']

})
export class PrincipalComponent {
    baseurl : string = "https://firebasestorage.googleapis.com/v0/b/epifacildiego.appspot.com/o/ambientes%2F"
    baseurlEpi : string = "https://firebasestorage.googleapis.com/v0/b/epifacildiego.appspot.com/o/epis%2F"

    ambiente: Ambiente[] = [];
    
    userName: string = '';

    isLinear = false;

    firstFormGroup: FormGroup;
  
    items: Observable<any[]>;
    
    todoMaos = [];

    listMaos = [];


    todoPes = [];

    todoPeitoral = [];

    todoCabeca = [];

    done = [];
   
    limitPage = 3;

    totalPagesMaos = 0;

    pageNumberMaos = 1;

    pageNumberPeitoral = 1;

    pageNumberPes = 1;

    pageNumberCabeca = 1;


 
    drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
    }
    
    constructor(
        private activatedRoute: ActivatedRoute,
        db: AngularFireDatabase,
        private _formBuilder: FormBuilder
        ) { 
        this.inicializaListaEpis(db);

        this.inicializaAmbientes(db);

      }

     

      nextPageMaos(){
        this.todoMaos = this.listMaos.slice(this.pageNumberMaos * this.limitPage, (this.pageNumberMaos + 1) * this.limitPage);
        this.pageNumberMaos += 1;
        console.log("LISTA GUARDADA",this.listMaos);
        console.log("LISTA POS PAGINA",this.todoMaos);

      }
      
      lastPageMaos(){

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

      verificarResultado(){

      }


      inicializaAmbientes(db: AngularFireDatabase){
        this.items =   db.list('/ambientes').snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
      }

      inicializaListaEpis(db: AngularFireDatabase){
        db.list('/epis',  ref => ref.orderByChild('localVestimenta').equalTo('MAOS')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.totalPagesMaos = data.length;
            this.montaArrayMaos(data)
          }
        })
      
        db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('PEITORAL')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayPeitoral(data)
          }
        })

        db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('PES')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayPes(data)
          }
        })

        db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('CABECA')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayCabeca(data)
          }
        })
      }


      montaArrayMaos(c){
        c.forEach( userData =>{
          this.listMaos.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
        console.log("ini ", this.listMaos);
        this.todoMaos = this.listMaos.slice(this.pageNumberMaos * this.limitPage, (this.pageNumberMaos + 1) * this.limitPage);
        console.log("fim ", this.todoMaos);
        // function paginate (array, page_size, page_number) {
        //   --page_number; // because pages logically start with 1, but technically with 0
        //   return array.slice(page_number * page_size, (page_number + 1) * page_size);
        // }
        
        // console.log(paginate([1, 2, 3, 4, 5, 6], 2, 2));
        // console.log(paginate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4, 1));
      }

      montaArrayPes(c){
        c.forEach( userData =>{
          this.todoPes.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
      }

      montaArrayCabeca(c){
        c.forEach( userData =>{
          this.todoCabeca.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
      }

      montaArrayPeitoral(c){
        c.forEach( userData =>{
          this.todoPeitoral.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
      }
      


}