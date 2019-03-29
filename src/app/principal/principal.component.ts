import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ambiente } from '../ambientes/ambiente/ambiente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { transferArrayItem, CdkDragDrop, moveItemInArray, CdkDrag } from '@angular/cdk/drag-drop';

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
  
    itemsRef: AngularFireList<any>;

    items: Observable<any[]>;
    
    itemsEpi: Observable<any[]>;

    resultado: any[];
    //
    newItems = [
      'Item 0',
      'Item 1',
      'Item 2',
      'Item 3',
    ]
    
    activeItems = [
      'Item 4',
      'Try to move me',
    ]

    filteredItems: Array<any>;

 
    drop(event: CdkDragDrop<string[]>) {
      console.log(event);
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data, 
           event.previousIndex, 
           event.currentIndex
        );
       } else {
         transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
    
    constructor(
        private activatedRoute: ActivatedRoute,
        db: AngularFireDatabase,
        private router: Router,
        private _formBuilder: FormBuilder
    
        ) { 
        this.itemsRef = db.list('ambientes');
    
        this.items.subscribe((_items)=> {
          this.filteredItems = [];
          _items.forEach(item => {
              if( item.name.toLowerCase().indexOf(item.toLowerCase()) > -1) {
                  this.filteredItems.push({ key: item.payload.key, ...item.payload.val() });
              } 
          })
        });        


        // this.items =  this.itemsRef.snapshotChanges().pipe(
        //   map(changes => 
        //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        //   )
        // );
        this.itemsEpi = db.list('/epis').snapshotChanges().pipe(
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