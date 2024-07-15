import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'admin';
  password = '';
  user: User={"userId": 0, "userName":"", "userPassword":"", "userPhone": 0, "userEmail":"", "active": null, "userType":""};
  invalidLogin = false;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit(): void {
  }

  // Check user for authenticatoin
  checkLogin() {
    if(this.loginservice.authenticate(this.username, this.password)) {
      this.loginservice.getRole(this.username).subscribe((data: User)=> {
        this.user.userType = data.toString();
        //this.user.userType = '';
        console.log('user '+JSON.stringify(data))
        console.log('user data  '+JSON.stringify(this.user))
        this.redirect();
      });
    }
    else {
      console.log("Invalid Login Credentials..");
      this.invalidLogin = true;
    }
  }

  // Redirect based on the user role
  redirect() {
    if(this.user.userType === 'ROLE_CUSTOMER') {
      console.log('use type correct')
      sessionStorage.setItem('role', 'customer');
      sessionStorage.setItem('userId', String(this.user.userId));
      this.invalidLogin = false;
      this.router.navigate(["welcomeuser"]).then(()=> {
        window.location.reload();
      });
    }
    else if(this.user.userType === 'ROLE_ADMIN') {
      sessionStorage.setItem('role', 'admin');
      sessionStorage.setItem('userId', String(this.user.userId));
      this.invalidLogin = false;
      this.router.navigate(["welcomeAdmin"]).then(()=> {
        window.location.reload();
      });
    }
  }

}
