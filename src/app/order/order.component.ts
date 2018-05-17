import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radioOption.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  constructor(private orderServ: OrderService, private router: Router, private formbuider: FormBuilder) { }

  opPagamento: RadioOption[] = [
    { label: "Dinheiro", valor: "DIN" },
    { label: "Cartão de débido", valor: "DEB" },
    { label: "Cartão de crédito", valor: "CRD" },
    { label: "Ticket refeição", valor: "TRE" }
  ]

  valorEntrega: number = 9;
  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numeroPattern = /^[0-9]*$/;
  formularioCompra: FormGroup; // recebe o formulario *F1
  orderId: string;

  valorItens(): number {
    return this.orderServ.valorItens();
  }

  isOrderCompleted():boolean{
    return this.orderId !== undefined;
  }

  ngOnInit() {
    this.formularioCompra = this.formbuider.group({ //para colocar o valiudador em tudo, depois do igual coloque new FormGroup
      // colocando caracteristicas do form *F2
      nome: new FormControl('', { // uma forma diferente de validar o campo
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'blur' // quando o campo está no estado 'blur', a validação é ativada e feita.
      }),
      email: this.formbuider.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirma: this.formbuider.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      endereco: this.formbuider.control('', [Validators.required]),
      numero: this.formbuider.control('', [Validators.required, Validators.pattern(this.numeroPattern)]),
      complemento: '',
      formaPagamento: this.formbuider.control('', Validators.required)
    }, { validator: OrderComponent.valoresIguais }//fazendo um validador para comprarar os valores
    )
  }
  static valoresIguais(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirma = group.get('emailConfirma');
    if (!email || !emailConfirma) {
      return undefined; //não associa a chave a grupo nenhum
    }
    if (email.value !== emailConfirma.value) {
      return { emailInvalido: true }// chave e retorno
    }
    return undefined; //não associa a chave a grupo nenhum

  }

  checkOrder(order: Order) {// ESTE MÉTODO PEGA O ARRAY DE CART ITEMS E TRANSFORMA EM UM ARRAY DE ITENSORDER
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantidade, item.menuItem.id))
    this.orderServ.checkOrder(order)
      .pipe(
        tap((orderId: string) => {
        this.orderId = orderId;
      }))
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-summary']) // caso a compra seja realizada com sucesso, navegue para esta rota
        this.orderServ.clear();
      })
  } 

  cartItems(): CartItem[] {
    return this.orderServ.cartItems();
  }
  aumentarQtd(item: CartItem) {
    this.orderServ.aumentarQtdOrder(item);
  }
  diminuirQtd(item: CartItem) {
    this.orderServ.diminuirQtdOrder(item);
  }
  removerItem(item: CartItem) {
    this.orderServ.removerItemOrder(item);
  }


}
