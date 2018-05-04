import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MenuItem } from './menu-item.model';
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('itemDoMenuApareceu', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translateY(-30px)'}),
        animate('400ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  @Input('itemDoMenu') menuItem: MenuItem;
  @Output() add = new EventEmitter();
  estadoMenuItem = "ready";


  constructor() { }

  ngOnInit() {
  }

  clicouAdicionar(){
    this.add.emit(this.menuItem);
  }

}
