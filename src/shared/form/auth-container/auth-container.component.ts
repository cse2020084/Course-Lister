import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss']
})
export class AuthContainerComponent implements OnInit {
  public isLoginMode = true; // false = registration, true = login
  constructor() { }

  ngOnInit(): void {
  }

  toggleMode(){
    this.isLoginMode = !this.isLoginMode;
  }

}
