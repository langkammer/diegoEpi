import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'ap-resultado',
    templateUrl: 'resultado.component.html'

})
export class ResultadoComponent {

    @BlockUI() blockUI: NgBlockUI;

    resultado = {
        ambiente : {
            capacete : '',
            luvas : '',
            vestimentas : '',
            calcado : '',
            oculos : '',
            protetor_facial : '',
            protetor_respiratorio : '',
            protetor_auricular : ''
        },
        episSelecionados : []
    
    };

    listaEpisCertos = []

    db : AngularFireDatabase;

    key = "";

    object : Observable<any>;

    numAcertos = 0;

    totalQuestoes = 0;

    baseurl : string = "https://firebasestorage.googleapis.com/v0/b/epifacildiego.appspot.com/o/epis%2F"

    constructor(private route:ActivatedRoute, private router:Router,  db: AngularFireDatabase){
      this.db = db;
    }
    
   
    /* Using snapshot */
    ngOnInit() {
        this.listaEpisCertos = [];

        this.key = this.route.snapshot.params['key'];

        console.log(this.key)
        this.blockUI.start('Carregando Resultados ...'); // Start blocking

        this.db.object('resultados/' + this.key).snapshotChanges().subscribe( res =>{
            if (res) {
                this.blockUI.stop(); // Stop blocking
                this.montaObjetoResultado(res.payload.val());
            }
        })
    }

   montaObjetoResultado(result){
       this.resultado = result;

       this.totalQuestoes = this.resultado.episSelecionados.length;
       console.log("resultado", this.resultado)
       this.popularRespostasCertas();

       console.log("lista epis certos", this.listaEpisCertos)

    }



   popularRespostasCertas(){
    if(this.resultado.ambiente.vestimentas!='SEM'){
        this.blockUI.start('Carregando Respostas ...'); // Start blocking
        this.db.object('epis/' + this.resultado.ambiente.vestimentas).snapshotChanges().subscribe( res =>{
            if (res) {
                this.blockUI.stop(); // Stop blocking
                this.listaEpisCertos.push({ key: res.payload.key, ...res.payload.val() });
            }
        })
    }
    if(this.resultado.ambiente.calcado!='SEM'){
        this.blockUI.start('Carregando Respostas ...'); // Start blocking
        this.db.object('epis/' + this.resultado.ambiente.calcado).snapshotChanges().subscribe( res =>{
            if (res) {
                this.blockUI.stop(); // Stop blocking
                this.listaEpisCertos.push({ key: res.payload.key, ...res.payload.val() });
            }
        })
    }
    if(this.resultado.ambiente.capacete!='SEM'){
        this.blockUI.start('Carregando Respostas ...'); // Start blocking
        this.db.object('epis/' + this.resultado.ambiente.capacete).snapshotChanges().subscribe( res =>{
            if (res) {
                this.blockUI.stop(); // Stop blocking
                this.listaEpisCertos.push({ key: res.payload.key, ...res.payload.val() });
            }
        })
    }
    if(this.resultado.ambiente.luvas!='SEM'){
        this.blockUI.start('Carregando Respostas ...'); // Start blocking
        this.db.object('epis/' + this.resultado.ambiente.luvas).snapshotChanges().subscribe( res =>{
            if (res) {
                this.blockUI.stop(); // Stop blocking
                this.listaEpisCertos.push({ key: res.payload.key, ...res.payload.val() });
            }
        })
    }
    if(this.resultado.ambiente.oculos!='SEM'){
        this.blockUI.start('Carregando Respostas ...'); // Start blocking
        this.db.object('epis/' + this.resultado.ambiente.oculos).snapshotChanges().subscribe( res =>{
            if (res) {
                this.blockUI.stop(); // Stop blocking
                this.listaEpisCertos.push({ key: res.payload.key, ...res.payload.val() });
            }
        })
    }
    if(this.resultado.ambiente.protetor_auricular!='SEM'){
        this.blockUI.start('Carregando Respostas ...'); // Start blocking
        this.db.object('epis/' + this.resultado.ambiente.protetor_auricular).snapshotChanges().subscribe( res =>{
            if (res) {
                this.blockUI.stop(); // Stop blocking
                this.listaEpisCertos.push({ key: res.payload.key, ...res.payload.val() });
            }
        })
    }
    if(this.resultado.ambiente.protetor_facial!='SEM'){
        this.blockUI.start('Carregando Respostas ...'); // Start blocking
        this.db.object('epis/' + this.resultado.ambiente.protetor_facial).snapshotChanges().subscribe( res =>{
            if (res) {
                this.blockUI.stop(); // Stop blocking
                this.listaEpisCertos.push({ key: res.payload.key, ...res.payload.val() });
            }
        })
    }
    if(this.resultado.ambiente.protetor_respiratorio!='SEM'){
        this.blockUI.start('Carregando Respostas ...'); // Start blocking
        this.db.object('epis/' + this.resultado.ambiente.protetor_respiratorio).snapshotChanges().subscribe( res =>{
            if (res) {
                this.blockUI.stop(); // Stop blocking
                this.listaEpisCertos.push({ key: res.payload.key, ...res.payload.val() });
            }
        })
    }
   }
   
   verificaRespostaArray(local,key){
       let retorno = false;
       if(_.find(this.listaEpisCertos, { 'key' : key, 'localVestimenta' : local}))
        retorno = true;
       return retorno;
   }

   trazRetornoResposta(local){
    return _.find(this.listaEpisCertos, { 'localVestimenta' : local});
   }

   verificaResposta(local,keyRespota){
       let retorno = false;
       if(local=="CAPACETE")
        if(this.resultado.ambiente.capacete == keyRespota)
            retorno = true;
       if(local=="LUVAS")
        if(this.resultado.ambiente.luvas == keyRespota)
            retorno = true;
       if(local=="VESTIMENTAS")
        if(this.resultado.ambiente.vestimentas == keyRespota)
            retorno = true;
       if(local=="CALCADOS")
        if(this.resultado.ambiente.calcado == keyRespota)
            retorno = true;
       if(local=="OCULOS")
        if(this.resultado.ambiente.oculos == keyRespota)
            retorno = true;    
       if(local=="PROTETORES_AURICULARES")
        if(this.resultado.ambiente.protetor_auricular == keyRespota)
            retorno = true;    
       if(local=="PROTETORES_FACIAIS")
        if(this.resultado.ambiente.protetor_facial == keyRespota)
            retorno = true;       
       if(local=="PROTETORES_RESPIRATORIOS")
        if(this.resultado.ambiente.protetor_respiratorio == keyRespota)
            retorno = true;       
       
       if(retorno)
        this.numAcertos += 1;

        return retorno;
   }
}