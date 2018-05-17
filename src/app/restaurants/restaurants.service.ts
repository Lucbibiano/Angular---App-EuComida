import { Restaurant } from "./restaurant/restaurant.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import {MEAT_API} from "../app.api";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { MenuItem } from "../restaurant-detail/menu-item/menu-item.model";
import { serializePath } from "@angular/router/src/url_tree";

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient) {

    }

    restaurants(search?: string): Observable<Restaurant[]> {
        let parametros: HttpParams = undefined;
        if(search){
            parametros = new HttpParams().set('q', search); // o HttpParams é imutável, ou seja, é preciso dar um valor a este método no momento da instancia
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: parametros});
        // UTILIZADO PARA IMPLEMENTAÇÃO ANTIGA HTTPMODULE
        // return this.http.get(`${MEAT_API}/restaurants`, {params: {q: search}})
        // .map(resposta => resposta.json()).
        // catch(ErrorHandler.handleError);
     }
 
     restaurantById(id: string): Observable<Restaurant>{
         return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
         // UTILIZADO PARA IMPLEMENTAÇÃO ANTIGA HTTPMODULE
        //  .map(resp => resp.json()).
        //  catch(ErrorHandler.handleError);
     }
     
     reviewsOfRestaurants(id: string): Observable<any>{
         return this.http.get(`${MEAT_API}/restaurant/${id}/reviews`)
         // UTILIZADO PARA IMPLEMENTAÇÃO ANTIGA HTTPMODULE
        //  .map(revi => revi.json())
        //  .catch(ErrorHandler.handleError);
     }

     menuOfRestaurant(id: string): Observable<MenuItem>{
         return this.http.get<MenuItem>(`${MEAT_API}/restaurant/${id}/menu`)
         // UTILIZADO PARA IMPLEMENTAÇÃO ANTIGA HTTPMODULE
        //  .map(menu => menu.json())
        //  .catch(ErrorHandler.handleError);
     }


    // rests: Restaurant[] = [
    //     {
    //         id: "bread-bakery",
    //         name: "Bread & Bakery",
    //         category: "Bakery",
    //         deliveryEstimate: "25m",
    //         rating: 4.9,
    //         imgPath: "assets/img/restaurants/breadbakery.png",
    //         about: "A Bread & Brakery tem 40 anos de mercado. Fazemos os melhores doces e pães. Compre e confira.",
    //         hours: "Funciona de segunda à sexta, de 8h às 23h"
    //     },
    //     {
    //         id: "burger-house",
    //         name: "Burger House",
    //         category: "Hamburgers",
    //         deliveryEstimate: "100m",
    //         rating: 3.5,
    //         imgPath: "assets/img/restaurants/burgerhouse.png",
    //         about: "40 anos se especializando em trash food.",
    //         hours: "Funciona todos os dias, de 10h às 22h"
    //     }
    // ];
}