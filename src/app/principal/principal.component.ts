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

    teste = {
      nome : '',
      ambiente : {}
    };

    isLinear = false;

    firstFormGroup: FormGroup;
  
    items: Observable<any[]>;
    

    listLuvas = [];

    listCalcados = [];

    listVestimentas = [];

    listCapacetes = [];

    listOculos = [];

    listProtetAuric = [];

    listProtetFacial = [];

    listProtetRes = [];



    todoLuvas = [];

    todoCalcados = [];

    todoVestimentas = [];

    todoCapacetes = [];

    todoOculos= [];

    todoProtetAuric = [];

    todoProtetFacial = [];

    todoProtetRes = [];


    done = [];
   
    limitPage = 1;

    paginaLuvas = 0;

    paginaCalcados = 0;

    paginaVestimentas = 0;

    paginaCapacetes = 0;

    paginaOculos= 0;

    paginaProtetAuric = 0;

    paginaProtetFacial = 0;

    paginaProtetRes = 0;


 
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
        private _formBuilder: FormBuilder,
        private router: Router
        ) { 
        this.inicializaListaEpis(db);

        this.inicializaAmbientes(db);

      }

     

     
   

      ngOnInit(): void {
        this.userName = this.activatedRoute.snapshot.params.userName;
        this.ambiente = this.activatedRoute.snapshot.data['ambientes'];
    
        this.firstFormGroup = this._formBuilder.group({
          nome: ['', Validators.required]
        });

    
      }

      selecionarAmbiente(i){
        this.teste.ambiente = i;
        this.teste.nome = this.firstFormGroup.value.nome;
        console.log("TESTE SELECIONADO", this.teste);
      }

      verificarResultado(){
        this.router.navigate(['resultado', {resultado : this.teste, episSelecionados : this.done} ]);

      }


      inicializaAmbientes(db: AngularFireDatabase){
        this.items =   db.list('/ambientes').snapshotChanges().pipe(
          map(changes => 
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
      }

      inicializaListaEpis(db: AngularFireDatabase){
        db.list('/epis',  ref => ref.orderByChild('localVestimenta').equalTo('LUVAS')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayLuvas(data)
          }
        })
      
        db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('CAPACETE')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayCapacete(data)
          }
        })

        db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('VESTIMENTAS')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayVestimenta(data)
          }
        })

        db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('CALCADOS')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayCalcados(data)
          }
        })


        db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('OCULOS')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayOculos(data)
          }
        })

        db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('PROTETORES_AURICULARES')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayProtetorAuriculares(data)
          }
        })

        db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('PROTETORES_FACIAIS')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayProtetorFaciais(data)
          }
        })

        db.list('/epis', ref => ref.orderByChild('localVestimenta').equalTo('PROTETORES_RESPIRATORIOS')).snapshotChanges().subscribe( data =>{
          if (data) {
            this.montaArrayProtetorRespiratorios(data)
          }
        })
      }


      montaArrayCapacete(c){
        c.forEach( userData =>{
          this.listCapacetes.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
        this.todoCapacetes = this.paginate(this.listCapacetes,this.limitPage,this.paginaCapacetes);
      }
      

      montaArrayLuvas(c){
        c.forEach( userData =>{
          this.listLuvas.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
        this.todoLuvas = this.paginate(this.listLuvas,this.limitPage,this.paginaLuvas);
      }

   
      
      montaArrayVestimenta(c){
        c.forEach( userData =>{
          this.listVestimentas.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
        this.todoVestimentas = this.paginate(this.listVestimentas,this.limitPage,this.paginaVestimentas);
      }
    
            
      montaArrayCalcados(c){
        c.forEach( userData =>{
          this.listCalcados.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
        this.todoCalcados = this.paginate(this.listCalcados,this.limitPage,this.paginaCalcados);
      }
    

  
      montaArrayOculos(c){
        c.forEach( userData =>{
          this.listOculos.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
        this.todoOculos = this.paginate(this.listOculos,this.limitPage,this.paginaOculos);
      }
    
      montaArrayProtetorAuriculares(c){
        c.forEach( userData =>{
          this.listProtetAuric.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
        this.todoProtetAuric = this.paginate(this.listProtetAuric,this.limitPage,this.paginaProtetAuric);
      }
    
      montaArrayProtetorFaciais(c){
        c.forEach( userData =>{
          this.listProtetFacial.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
        this.todoProtetFacial = this.paginate(this.listProtetFacial,this.limitPage,this.paginaProtetFacial);
      }
      

          
      montaArrayProtetorRespiratorios(c){
        c.forEach( userData =>{
          this.listProtetRes.push({ key: userData.payload.key, ...userData.payload.val() }); 
        });
        this.todoProtetRes = this.paginate(this.listProtetRes,this.limitPage,this.paginaProtetRes);
      }
      

      nextPageCapacete(){
        this.todoCapacetes = [];

        if(this.paginaCapacetes == 0){
          this.paginaCapacetes += 1;
          this.todoCapacetes = this.paginate(this.listCapacetes,this.limitPage,this.paginaCapacetes);
        }
        else{
          if(this.paginaCapacetes + 1 < this.listCapacetes.length && this.paginaCapacetes + 1 != this.listCapacetes.length)
            this.paginaCapacetes += 1;
          this.todoCapacetes = this.paginate(this.listCapacetes,this.limitPage,this.paginaCapacetes);

        }



      }
      
      lastPageCapacete(){
        if(this.paginaCapacetes != 0){
          this.paginaCapacetes -= 1;
        }
        this.todoCapacetes = this.paginate(this.listCapacetes,this.limitPage,this.paginaCapacetes);
      }


      nextPageVestimentas(){
        this.todoVestimentas = [];

        if(this.paginaVestimentas == 0){
          this.paginaVestimentas += 1;
          this.todoVestimentas = this.paginate(this.listVestimentas,this.limitPage,this.paginaVestimentas);
        }
        else{
          if(this.paginaVestimentas + 1 < this.listVestimentas.length && this.paginaVestimentas + 1 != this.listVestimentas.length)
            this.paginaVestimentas += 1;
          this.todoVestimentas = this.paginate(this.listVestimentas,this.limitPage,this.paginaVestimentas);

        }
       
      }
      
      lastPageVestimentas(){
        if(this.paginaVestimentas != 0){
          this.paginaVestimentas -= 1;
        }
        this.todoVestimentas = this.paginate(this.listVestimentas,this.limitPage,this.paginaVestimentas);
      }


      nextPageLuvas(){
        this.todoLuvas = [];

        if(this.paginaLuvas == 0){
          this.paginaLuvas += 1;
          this.todoLuvas = this.paginate(this.listLuvas,this.limitPage,this.paginaLuvas);
        }
        else{
          if(this.paginaLuvas + 1 < this.listLuvas.length && this.paginaLuvas + 1 != this.listLuvas.length)
            this.paginaLuvas += 1;
          this.todoLuvas = this.paginate(this.listLuvas,this.limitPage,this.paginaLuvas);

        }
      }
      
      lastPageLuvas(){
        if(this.paginaLuvas != 0){
          this.paginaLuvas -= 1;
        }
        this.todoLuvas = this.paginate(this.listLuvas,this.limitPage,this.paginaLuvas);

      }



      nextPageCalcado(){
        this.todoCalcados = [];

        if(this.paginaCalcados == 0){
          this.paginaCalcados += 1;
          this.todoCalcados = this.paginate(this.listCalcados,this.limitPage,this.paginaCalcados);
        }
        else{
          if(this.paginaCalcados + 1 < this.listCalcados.length && this.paginaCalcados + 1 != this.listCalcados.length)
            this.paginaCalcados += 1;
          this.todoCalcados = this.paginate(this.listCalcados,this.limitPage,this.paginaCalcados);
        }
      }
      
      lastPageCaldado(){
        if(this.paginaCalcados != 0){
          this.paginaCalcados -= 1;
        }
        this.todoCalcados = this.paginate(this.listCalcados,this.limitPage,this.paginaCalcados);

      }


      nextPageOculos(){
        this.todoOculos = [];

        if(this.paginaOculos == 0){
          this.paginaOculos += 1;
          this.todoOculos = this.paginate(this.listOculos,this.limitPage,this.paginaOculos);
        }
        else{
          if(this.paginaOculos + 1 < this.listOculos.length && this.paginaOculos + 1 != this.listOculos.length)
            this.paginaOculos += 1;
          this.todoOculos = this.paginate(this.listOculos,this.limitPage,this.paginaOculos);
        }
      }
      
      lastPageOculos(){
        if(this.paginaOculos != 0){
          this.paginaOculos -= 1;
        }
        this.todoOculos = this.paginate(this.listOculos,this.limitPage,this.paginaOculos);
      }


      nextPageProtAuric(){
        this.todoProtetAuric = [];

        if(this.paginaProtetAuric == 0){
          this.paginaProtetAuric += 1;
          this.todoProtetAuric = this.paginate(this.listProtetAuric,this.limitPage,this.paginaProtetAuric);
        }
        else{
          if(this.paginaProtetAuric + 1 < this.listProtetAuric.length && this.paginaProtetAuric + 1 != this.listProtetAuric.length)
            this.paginaProtetAuric += 1;
          this.todoProtetAuric = this.paginate(this.listProtetAuric,this.limitPage,this.paginaProtetAuric);
        }
      }
      
      lastPageProtAuric(){

        if(this.paginaProtetAuric != 0){
          this.paginaProtetAuric -= 1;
        }
        this.todoProtetAuric = this.paginate(this.listProtetAuric,this.limitPage,this.paginaProtetAuric);
        
      }

      nextPageProtFacial(){
        this.todoProtetFacial = [];

        if(this.paginaProtetFacial == 0){
          this.paginaProtetFacial += 1;
          this.todoProtetFacial = this.paginate(this.listProtetFacial,this.limitPage,this.paginaProtetFacial);
        }
        else{
          if(this.paginaProtetFacial + 1 < this.listProtetFacial.length && this.paginaProtetFacial + 1 != this.listProtetFacial.length)
            this.paginaProtetFacial += 1;
          this.todoProtetFacial = this.paginate(this.listProtetFacial,this.limitPage,this.paginaProtetFacial);
        }
      }
      
      lastPageProtFacial(){
        if(this.paginaProtetFacial != 0){
          this.paginaProtetFacial -= 1;
        }
        this.todoProtetFacial = this.paginate(this.listProtetFacial,this.limitPage,this.paginaProtetFacial);

      }

      nextPageProtRes(){
        this.todoProtetRes = [];

        if(this.paginaProtetRes == 0){
          this.paginaProtetRes += 1;
          this.todoProtetRes = this.paginate(this.listProtetRes,this.limitPage,this.paginaProtetRes);
        }
        else{
          if(this.paginaProtetRes + 1 < this.listProtetRes.length && this.paginaProtetRes + 1 != this.listProtetRes.length)
            this.paginaProtetRes += 1;
          this.todoProtetRes = this.paginate(this.listProtetRes,this.limitPage,this.paginaProtetRes);
        }
      }
      
      lastPageProtRes(){
        if(this.paginaProtetFacial != 0){
          this.paginaProtetRes -= 1;
        }
        this.todoProtetRes = this.paginate(this.listProtetRes,this.limitPage,this.paginaProtetRes);

      }




      paginate (array, page_size, page_number) {
        return array.slice(page_number * page_size, (page_number + 1) * page_size);
      }


}