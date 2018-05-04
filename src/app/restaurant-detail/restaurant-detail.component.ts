import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { Restaurant } from '../restaurants/restaurant/restaurant.model';
import {ActivatedRoute, Route} from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html'
})
export class RestaurantDetailComponent implements OnInit {

  constructor(private servRestaurant: RestaurantsService,
  private rota: ActivatedRoute) { }

restaurant: Restaurant;

  ngOnInit() {
this.servRestaurant.restaurantById(this.rota.snapshot.params['id'])
.subscribe(rest => this.restaurant = rest);

  }

}
