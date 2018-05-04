import { Injectable } from "@angular/core";
import { ShoppingCardService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";
// import {Order, OrderItem} from "./order.model";
import { MEAT_API } from "../app.api";
import { Order, OrderItem } from './order.model';
import { LoginService } from "../security/login/login.service";


@Injectable()

export class OrderService {
    constructor(private cartService: ShoppingCardService, 
        private http: HttpClient
        // private loginS: LoginService
    ) { }

    order: any;

    cartItems(): CartItem[] {
        return this.cartService.items;
    }

    clear() {
        this.cartService.clear();
    }

    valorItens(): number {
        return this.cartService.total();
    }

    aumentarQtdOrder(item: CartItem): void {
        this.cartService.aumentarQtdShop(item);
    }
    diminuirQtdOrder(item: CartItem): void {
        this.cartService.diminuirQtdShop(item);
    }

    removerItemOrder(item: CartItem): void {
        this.cartService.removeItem(item);
    }

    checkOrder(order): Observable<string> {
        // const headers = new Headers();  // O servidor precisa saber o tipo de dado que mandamos, para isto, declaramos o Header
        // headers.append('Content-Type', 'application/json');
        
        
        // let headers = new HttpHeaders();
        // if(this.loginS.isLoggedIn){
        //     headers = headers.set(`Authorization`, `Bearer ${this.loginS.user.accessToken}` )
        // }

        return this.http.post<Order>(`${MEAT_API}/orders`, order) //, {headers: headers}
            .do(order => this.order = order)
            .map(order => order.id)
        // JSON.stringify(order),
        // new RequestOptions({ headers: headers }))
        // .map(response => response.json())
    }
}
