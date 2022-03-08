import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {

  firebasetsAuth: FirebaseTSAuth;

  state = AuthenticatorCompState.LOGIN;
  constructor(private dialogRef: MatDialogRef<AuthenticatorComponent>) {
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
  }


  onLogin(
    loginEmail: HTMLInputElement,
    loginPassword: HTMLInputElement) {
    let email = loginEmail.value;
    let password = loginPassword.value;
    if (this.isNotEmpty(email) && this.isNotEmpty(password)) {
      this.firebasetsAuth.signInWith({
        email: email,
        password: password,
        onComplete: (uc) => {
          this.dialogRef.close();
        },
        onFail: (err) => {
          alert(err);
        }
      });
    }
  }

  onResetClick(resetEmail: HTMLInputElement) {
    let email = resetEmail.value;
    if (this.isNotEmpty(email)) {
      this.firebasetsAuth.sendPasswordResetEmail({
        email: email,
        onComplete: (err) => {
          this.dialogRef.close();
        }
      });
    }
  }
  onRegisterClick(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement) {
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;

    if (
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password, confirmPassword)) {
      this.firebasetsAuth.createAccountWith({
        email: email,
        password: password,
        onComplete: (uc) => {
          alert("Account is Created")
          this.dialogRef.close();
        },
        onFail: (err) => {
          alert("Failed to create an account");
        }
      }
      );
    }
  }

  isNotEmpty(text: string) {
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWith: string) {
    return text == comparedWith;
  }
  onForgetPasswordClick() {
    this.state = AuthenticatorCompState.FORGET_PASSWORD;
  }
  onCreateAccountClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }
  onLogInClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLogInState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }
  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isForgetPasswordState() {
    return this.state == AuthenticatorCompState.FORGET_PASSWORD;
  }

  getStateText() {
    switch (this.state) {
      case AuthenticatorCompState.LOGIN:
        return "LogIn";
      case AuthenticatorCompState.REGISTER:
        return "Register";
      case AuthenticatorCompState.FORGET_PASSWORD:
        return "Forget Password";

    }
  }
}


export enum AuthenticatorCompState {
  LOGIN,
  FORGET_PASSWORD,
  REGISTER
}