  import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  ValorInput: any;
  @Input() label: string;
  @Input() msgErro: string;
  @Input() showTip: boolean = true;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) controle: FormControlName;

  constructor() { }

  ngOnInit() {
  }

  hasSuccess(): boolean{
    return  this.ValorInput.valid && (this.ValorInput.dirty || this.ValorInput.touched);
  }

  hasError(): boolean{
    return this.ValorInput.invalid && (this.ValorInput.dirty || this.ValorInput.touched)
  }

  ngAfterContentInit(){
    this.ValorInput = this.model || this.controle;
    if(this.ValorInput === undefined  ){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName');
    }
  }
}

