import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { MEAT_API } from "../../app.api";
import { User } from "./user.model";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd } from "@angular/router";

@Injectable()
export class LoginService{

    lastUrl: string;

    constructor(private http: HttpClient, private router: Router){
        this.router.events.filter(e => e instanceof NavigationEnd) // um Observable que coleta a URL atual dinamicamente
        .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
    }

    user: User;

    isAdmin(): boolean{
        if(this.user.perfil === undefined){
            return false;
        }else if(this.user.perfil === "admin"){
            return true;
        }else return false;
    }

    isLoggedIn(): boolean{
        return this.user !== undefined;
    }

    login(email: string, password: string): Observable<any>{
        return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
        .do(user => this.user = user);
    }

    logout(){
        this.user = undefined;
    }

    handleLogin(path: string = this.lastUrl){// se não for passado nenhum parâmetro na chamada deste método, será atribuido a variável lastUrl
        this.router.navigate(['/login', btoa(path)]);//btoa codifica a URL para ficar mais amigavel
    }
}