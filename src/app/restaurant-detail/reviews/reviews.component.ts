import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
    animations: [
    trigger('avaliacaoApareceu', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translateY(30px)'}),
        animate('300ms 0s ease-in')
      ])
    ])
  ]
})

export class ReviewsComponent implements OnInit {

  reviews: Observable<any>;

  estadoAnimacao = "ready";

  constructor(private restaurante: RestaurantsService, private rotaAtiva: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurante.reviewsOfRestaurants(this.rotaAtiva.parent.snapshot.params['id']);
  }

}
