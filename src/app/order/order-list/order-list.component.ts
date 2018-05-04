import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {

  constructor() { }

  @Input() items: CartItem[];

  @Output() aumentarQnt = new EventEmitter<CartItem>();
  @Output() diminuirQnt = new EventEmitter<CartItem>();
  @Output() remover = new EventEmitter<CartItem>();

  ngOnInit() {
  }

  emitAumentaQnt(item: CartItem) {
    this.aumentarQnt.emit(item);
  }

  emitDiminuiQnt(item: CartItem) {
    this.diminuirQnt.emit(item);
  }

  emitRemoveItem(item: CartItem) {
    this.remover.emit(item);
  }


}
