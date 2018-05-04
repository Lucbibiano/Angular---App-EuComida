import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from './user.model';
import { NotificationService } from '../../shared/messages/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, 
              private ls: LoginService, 
              private notification: NotificationService,
              private activatedR: ActivatedRoute, 
              private router: Router) { }

  loginForm: FormGroup;
  navigateTo: string;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('',[Validators.required])
    })
    this.navigateTo = this.activatedR.snapshot.params['to'] || btoa('/') ;//codifica
  }

  login(){
    this.ls.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(
                user => 
                  this.notification.notificar("Bem vindo "+user.name),
                response => //HttpErrorResponse
                  this.notification.notificar(response.error.mensagem),
                ()=>
                {
                  this.router.navigate([ atob(this.navigateTo)]);//descodifica
                })
  }

}
