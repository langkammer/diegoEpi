import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App Epi';

  email = undefined;

  constructor(public afAuth: AngularFireAuth){

  }

  ngOnInit(): void {
    console.log(this.afAuth.auth.currentUser)
    this.afAuth.auth.onAuthStateChanged(function(user) {
      console.log("user",user)
      if (user.email) {
        this.user =  user.email;
      } else {
        this.user = {};
      }
    });
  }


}
