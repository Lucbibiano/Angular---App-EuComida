import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  constructor() { }

  rates: number[] = [1, 2, 3, 4, 5];
  rate: number = 0;
  previewsRate: number;

@Output("avaliacao") avaliado = new EventEmitter<number>();

  ngOnInit() {

  }

  atribuirValorTemp(estrelaPassouPorCima: number) {
    if (this.previewsRate === undefined) {
      this.previewsRate = estrelaPassouPorCima;
    }
    this.rate = estrelaPassouPorCima;
  }

  atribuirNota(estrelaSelecionada: number): void {
    this.rate = estrelaSelecionada;
    this.previewsRate = undefined; 
    this.avaliado.emit(this.rate);
  }

  limparValorTemp(){
    if(this.previewsRate !== undefined){
      this.rate = this.previewsRate;
      this.previewsRate = undefined;
    }
  }
}
