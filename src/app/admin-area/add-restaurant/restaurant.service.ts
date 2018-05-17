import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Restaurant } from "../restaurant.model";
import { MEAT_API } from "../../app.api";
import { Recipe } from "./../recipe.model";
import { Review } from "../../restaurant-detail/reviews/review.model";


@Injectable()
export class RestaurantService{
    
    constructor(private http: HttpClient){}

    restaurants: any;
    resp: any;

    addRestaurant(restaurant){
        this.http.post(`${MEAT_API}/restaurants`, restaurant)
        .subscribe(resposta => {this.resp = resposta;console.log(this.resp)})
        
    }

    addRecipe(recipe){
        this.http.post(`${MEAT_API}/menu`, recipe)
        .subscribe(resposta => {console.log(resposta)})
    }

    addReview(review, nota: number){
        console.log("entrou");
        // this.http.post(`${MEAT_API}/reviews`, {"nn","njdwnjdnj","jndenjdenj","jdwjdwjn","jn"})
        // .do(c => {console.log(c)})
        // .subscribe(data => {console.log(data)})
    }

    loadData(){
        this.http.get(`${MEAT_API}/restaurants`)
        .subscribe(data => {this.restaurants = data;})
    }


}