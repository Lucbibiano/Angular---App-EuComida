import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../security/login/login.service';
import { User } from './../../security/login/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginS: LoginService, private route: Router) { }

  ngOnInit() {
  }

  user(): User{
    return this.loginS.user;
  }

  isAdmin(): boolean{
    return this.loginS.isAdmin();
  }

  isLoggedIn(): boolean{
    return this.loginS.isLoggedIn();
  }

  entrarAdmin(){
    this.route.navigate(['/admin']);
  }

  entrarLogin(){
    this.loginS.handleLogin();
  }

  logout(){
    this.loginS.logout();
  }


}
