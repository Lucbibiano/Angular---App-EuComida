import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOption } from './radioOption.model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true
  }
]
  //POSSIBILITA USAR O COMPONENTE COM AS DIRETIVAS DO NGFOR
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  constructor() {
  }

  @Input() options: RadioOption[];

  valor: any;
  onChange: any;
  //  = () => { };

  marcarCampo(valor: any) { //SETVALUE 
    this.valor = valor;
    this.onChange(this.valor);
  }

  ngOnInit() {

  }
//POSSIBILITA USAR O COMPONENTE COM AS DIRETIVAS DO NGFOR
//métodos usados para termos acesso as diretivas do NGFOR

    /**
     * Write a new value to the element.
     */
    writeValue(obj: any): void{
      this.valor = obj;
    }
    /**
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: any): void{
      this.onChange = fn;
    }
    /**
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn: any): void{

    }
    /**
     * This function is called when the control status changes to or from "DISABLED".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState?(isDisabled: boolean): void{

    }

}
