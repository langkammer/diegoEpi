import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']

})
export class LoginComponent {
    
    email = "";

    senha = "";

    constructor(public afAuth: AngularFireAuth,private router: Router) {
    }

    login() {
        this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha).then(
            function(suceso){
                alert("USUARIO EMAIL LOGADO : "+ suceso.user.email);
                this.router.navigateByUrl('/home');
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