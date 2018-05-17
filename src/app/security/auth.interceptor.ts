import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private injector: Injector){  // consegue pegar uma referencia para o mecanismo de Inje de Depend. do Angular.
        //Consegue-se obter referencias para qualquer instancia

    }   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const loginS = this.injector.get(LoginService);
        if(loginS.isLoggedIn()){
            const authRequest = request.clone(
                {setHeaders:{'Authorization':`Bearer ${loginS.user.accessToken}`}})

            return next.handle(authRequest);
        }else{
            return next.handle(request);
        }        
    }
}

