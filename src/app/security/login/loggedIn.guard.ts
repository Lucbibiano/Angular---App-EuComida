import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate{

    constructor(private loginS: LoginService){
    }

    checkAuthentication(path: string): boolean{
        const loggedIn = this.loginS.isLoggedIn();
        if(!loggedIn){
            this.loginS.handleLogin(`/${path}`); // route.path obtem o endereço de quem tentou acessar a rota
        }
        return loggedIn;
    }
    
    canLoad(route: Route): boolean{
        return this.checkAuthentication(route.path);
    }   

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        return this.checkAuthentication(activatedRoute.routeConfig.path);
    }
}
