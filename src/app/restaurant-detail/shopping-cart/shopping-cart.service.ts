import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { Injectable } from "@angular/core";
import { NotificationService } from "../../shared/messages/notification.service";

@Injectable()
export class ShoppingCardService{
    items: CartItem[] = [];

    constructor(private notificationService: NotificationService){}


    clear(){
        this.items = [];
    }

    total(): number{
        return this.items
        .map(item => item.valor())
        .reduce((anterior, atual) => anterior+atual, 0);
    }

    addItem(itemClicked: MenuItem){
        let foundItem = this.items.find((item) => item.menuItem.id === itemClicked.id);
        if(foundItem){
            this.aumentarQtdShop(foundItem);
        }else{
            this.items.push(new CartItem(itemClicked));
        }
        this.notificationService.notificar("Você adicionou o item "+itemClicked.name+" do carrinho.");
    }

    removeItem(item: CartItem){
        this.items.splice(this.items.indexOf(item), 1);
        this.notificationService.notificar("Você removeu o item "+item.menuItem.name+" do carrinho.")
    }

    aumentarQtdShop(item: CartItem){
        item.quantidade = item.quantidade + 1;
    }

    diminuirQtdShop(item: CartItem){
        item.quantidade = item.quantidade - 1;
        if(item.quantidade == 0){
            this.removeItem(item);
        }
    }


}