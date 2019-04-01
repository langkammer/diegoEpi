import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseAuth } from '@angular/fire';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit {
  title = 'Prova Epi | Diego';

  email = '';

  @BlockUI() blockUI: NgBlockUI;


  constructor(public afAuth: AngularFireAuth){
   
  }

  ngOnInit(): void {
    this.blockUI.start('Carregando  ...'); // Start blocking

    this.afAuth.authState.subscribe(res => {
      this.blockUI.stop(); // Stop blocking
      if (res && res.uid) {
        console.log('user is logged in');
        this.email = res.email;
      } else {
        this.email = ''
      }
    });
  
  }

  logout() {
    this.blockUI.start('Carregando  ...'); // Start blocking
    this.afAuth.auth.signOut();
    this.blockUI.stop(); // Stop blocking

  }


}
