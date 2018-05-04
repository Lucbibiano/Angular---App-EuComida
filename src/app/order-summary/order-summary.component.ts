import { Component, OnInit } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestaurantService } from '../admin-area/add-restaurant/restaurant.service';
import { Review } from '../restaurant-detail/reviews/review.model';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'mt-order-summary',
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {

  constructor(private fb: FormBuilder, private RestSer: RestaurantService, private orderSer: OrderService) { }

  avaliado: boolean;
  formularioAvaliacao: FormGroup;
  controle: FormControlName;
  nota: number;

  getRate(event){
    this.nota = event;
  }

  ngOnInit() {
    this.formularioAvaliacao = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      comments: this.fb.control('')
    })
  }

  addReview(review){
    this.avaliado = true;
    // review.date = new Date();    
    // review.restaurantId = this.orderSer.order.orderItems[0].menuId;
    this.RestSer.addReview(review, this.nota);
  }
}
