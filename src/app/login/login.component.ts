import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService) { }
  username;
  password;
  user = {
    email: '',
    password: ''
 };
  ngOnInit() {
  }
  signInWithEmail(username,password) {
    this.user.email=username;
    this.user.password=password;
    this.authService.signInRegular(this.user.email, this.user.password)
       .then((res) => {
          console.log(res);
    
          this.router.navigate(['dashboard']);
       })
       .catch((err) => console.log('error: ' + err));
 }
}
