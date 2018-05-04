import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../add-restaurant/restaurant.service';
import { FormControlName, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'mt-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  formularioReceita: FormGroup;
  controle: FormControlName;
  img: File;
  leitor = new FileReader();

  constructor(private restaurantServ: RestaurantService, private fb: FormBuilder) { }

  ngOnInit() {
    this.formularioReceita = this.fb.group({
      imagePath: this.fb.control(''),
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      price: this.fb.control(''),
      restaurantId: this.fb.control('')
    })
    this.restaurantServ.loadData();
  }

  addRecipe(recipe: Recipe) {
    recipe.imagePath = this.leitor.result;
    this.restaurantServ.addRecipe(recipe);

    //Recarrega a página para limpar os componentes
    window.location.reload();
  }

  onImgChange(event) {
    this.img = event.target.files[0];
    if (event.target.files && event.target.files.length > 0) {
      this.leitor.readAsDataURL(this.img);
    }
  }



}
