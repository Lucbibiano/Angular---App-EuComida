import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-delivery-costs',
  templateUrl: './delivery-costs.component.html'
})
export class DeliveryCostsComponent implements OnInit {

  @Input("valorFrete") entrega: number;
  @Input() valorItens: number;

  total(): number{
    return this.entrega + this.valorItens;
  }

  constructor() { }

  ngOnInit() {
  }

}
