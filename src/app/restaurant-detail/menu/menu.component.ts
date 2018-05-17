import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem>;

  constructor(private servResta: RestaurantsService,
              private rotaMenu: ActivatedRoute) { }

  ngOnInit() {
    this.menu = this.servResta.menuOfRestaurant(this.rotaMenu.parent.snapshot.params['id']);
  }

  adicionarAoMenu(item: MenuItem){
    console.log(item);
  }


}
