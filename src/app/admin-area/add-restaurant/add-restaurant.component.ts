import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Restaurant } from '../../restaurants/restaurant/restaurant.model';
import { RestaurantService } from './restaurant.service';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MEAT_API } from '../../app.api';
import { NotificationService } from '../../shared/messages/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  formularioRestaurante: FormGroup;
  controle: FormControlName;
  outraC: boolean = false;
  img: File;
  leitor = new FileReader();

  constructor(private restaurantServ: RestaurantService, private fb: FormBuilder,
    private notification: NotificationService, private router: Router) {
  }

  ngOnInit() {
    this.formularioRestaurante = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      category: this.fb.control('', [Validators.required]),
      deliveryEstimate: this.fb.control('', [Validators.required]),
      about: this.fb.control(''),
      hours: this.fb.control(''),
      imagePath: this.fb.control(''),
      otherCategory: this.fb.control('')
    })
    this.restaurantServ.loadData();
  }

  anotherCategoryChange(event) {
    if (event.target.value == "outra") {
      this.outraC = true;
    }
  }

  onImgChange(event) {
    this.img = event.target.files[0];
    if (event.target.files && event.target.files.length > 0) {
      this.leitor.readAsDataURL(this.img);
    }
  }

  addRestaurant(restaurant: Restaurant) {

    //tratando o ID
    var id: string = this.formularioRestaurante.get('name').value;
    for (let index = 0; index < id.length; index++) {
      id = id.replace(" ", "-");
    }
    restaurant.id = id.toLocaleLowerCase();

    // tratando a categoria
    if (this.formularioRestaurante.get('category').value == 'outra') {
      var valor = this.formularioRestaurante.get('otherCategory').value;
      this.formularioRestaurante.patchValue({
        category: valor
      })
      restaurant.category = this.formularioRestaurante.get('category').value;
    }

    //tratando imagem
    restaurant.imagePath = this.leitor.result;

    //chamando o servico de restaurante
    this.restaurantServ.addRestaurant(restaurant);

    //Recarrega a página para limpar os componentes
    window.location.reload();


  }

}
