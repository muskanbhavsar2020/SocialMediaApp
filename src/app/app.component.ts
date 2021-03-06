import { Component } from '@angular/core';

import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import { MatDialog } from '@angular/material/dialog';
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
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  userHasProfile = true;
  public static userDocument: UserDocument={publicName:"",description:"",userId:""};

  constructor(private loginSheet: MatDialog, private router: Router) {
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {

            },
            whenSignedOut: user => {
              AppComponent.userDocument=null;
            },
            whenSignedInAndEmailNotVerified: user => {
              this.router.navigate(["emailVerification"]);
            },
            whenSignedInAndEmailVerified: user => {
              this.getUserProfile();
            },
            whenChanged: user => {

            }
          }
        );
      }
    );
  }
  public static getUserDocument(){
    return AppComponent.userDocument;
  }
  getUsername(){
    try{
      return AppComponent.userDocument.publicName;
    }catch(err){}
  }
  getUserProfile() {
    this.firestore.listenToDocument({
      name: "Getting Document",
      path: ["Users", this.auth.getAuth().currentUser?.uid!],
      onUpdate: (result) => {
        AppComponent.userDocument = <UserDocument>result.data();
        this.userHasProfile = result.exists;
        AppComponent.userDocument.userId=this.auth.getAuth().currentUser.uid;
        if (this.userHasProfile) {
          this.router.navigate(["postfeed"]);
        }
      }
    });
  }

  loggedIn() {
    return this.auth.isSignedIn();
  }

  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }

  onLogoutClick() {
    this.auth.signOut();
    this.router.navigate([""]);
  }
  onProfileClick(){
  this.router.navigate(["profilepage"]);
  }
  onHomeClick()
  {
    this.router.navigate(["postfeed"]);
  }
}

export interface UserDocument {
  publicName: string;
  description: string;
  userId:string;
}
