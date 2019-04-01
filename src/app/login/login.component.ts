import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'ap-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent {
    
    email = "";

    senha = "";

    logn: any[] = [];

    @BlockUI() blockUI: NgBlockUI;



    constructor(public afAuth: AngularFireAuth,
        private router: Router,
        private activatedRoute: ActivatedRoute) {
    } 

    ngOnInit(): void {
        this.logn = this.activatedRoute.snapshot.data['login'];
        this.afAuth.authState.subscribe(res => {
            if (res && res.uid) {
                this.router.navigateByUrl('/home');
            } else {
              this.email = ''
            }
          });
    }

    login() {
        this.blockUI.start('Carregando  ...'); // Start blocking
        this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha).then(
            function(suceso){
                alert("USUARIO EMAIL LOGADO : "+ suceso.user.email);
            }
        ).catch(
            function(error){
                alert(error)
            }
        );
    }
    logout() {
        this.afAuth.auth.signOut();
    }

    criarPerfil(){
        this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.senha)
            .then(function(suceso){
                alert("USUARIO EMAIL LOGADO : "+ suceso.user.email);
                this.router.navigateByUrl('/home');
            })
            .catch(function(error) {
            alert(error)
            console.log(error);
            }
        );
    }

}