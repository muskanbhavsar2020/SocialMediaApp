import { Component } from '@angular/core';

import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import {MatDialog} from '@angular/material/dialog';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SocialMediaApp';
  auth=new FirebaseTSAuth();
  isLoggedIn=false;
  firestore=new FirebaseTSFirestore();
  userHasProfile=true;
  userDocument:userDocument;
  constructor(private loginSheet: MatDialog, private router:Router) {
    this.auth.listenToSignInStateChanges(
      user=>{
        this.auth.checkSignInState(
          {
            whenSignedIn:user=>{
            
            },
            whenSignedOut:user=>{
              
            },
            whenSignedInAndEmailNotVerified:user=>{
              this.router.navigate(["emailVerification"]);
            },
            whenSignedInAndEmailVerified:user=>{
              this.getUserProfile(); 
            },
            whenChanged:user=>{

            }
          }
        );
      }
    );
   }
   onLogoutClick(){
     this.auth.signOut(); 
   }
   loggedIn(){
     return this.auth.isSignedIn();
   }
  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }
  getUserProfile(){
    this.firestore.listenToDocument(
      {
        name:"Getting Document",
        path:["Users",this.auth.getAuth().currentUser.uid],
        onUpdate:(result)=>{
          this.userDocument=<userDocument>result.data();
          this.userHasProfile=result.exists;
          if(this.userHasProfile){
            this.router.navigate(["postfeed"]);
          }
        }
      }
    );

  }
}

export interface userDocument{
  publicName:string;
  description:string;
}
