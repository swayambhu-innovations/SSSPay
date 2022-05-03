import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  constructor() { }

  ngOnInit() {
  }
  togglePassword(){
    this.showPassword = !this.showPassword;
    //console.log(this.showPassword);
  }
}