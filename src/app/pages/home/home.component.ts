import { Component, OnInit } from '@angular/core';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {
  }

  constructor(private loginSheet: MatDialog) { }
  onLoginClick() {
    this.loginSheet.open(AuthenticatorComponent);
  }
}
