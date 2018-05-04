import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from "@angular/animations";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations:[
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height":"0px" 
      })),
      state('visible', style({
        opacity: 1,
        "max-height":"70px",
        "margin-top":"20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out')) // independente do estado, faça a mesma animação.
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];

  estadoSearchBar = 'hidden';

  //propriedades para reprensentar o formulario
  searchForm: FormGroup; //representa o formulario
  searchControl: FormControl; // referencia para ouvir os valores digitados

  constructor(private restService: RestaurantsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl //associando o formControlName do form com o FormControl
    })
  
    this.searchControl.valueChanges
            .debounceTime(500) // aguarda o tempo informado em parecenteses e ms para pesquisae 
            .distinctUntilChanged() // envia somente eventos que sejam diferentes um dos outros, se for igual não procura
            // .do(termo => console.log(`q=${termo}`)) //Apenas um teste
            .switchMap(termo => 
            this.restService.restaurants(termo)
            .catch(erroBusca => Observable.from([]))) // O catch ajuda a barra a não retornar erro caso o banco de dados não exista ou
            //não haja sucesso na busca, ele mantem o processo funcionando, não quebra o processo.
            .subscribe(rests => this.restaurants = rests);

    this.restService.restaurants().subscribe(rests => this.restaurants = rests); // preciso deste observable só para construir a tela.
    // this.searchControl.valueChanges.subscribe(termo => console.log(termo)); // imprimir o que chega
  
  }

  toggleSearch(){
    this.estadoSearchBar = this.estadoSearchBar === 'hidden' ? 'visible' : 'hidden';
  }
}
