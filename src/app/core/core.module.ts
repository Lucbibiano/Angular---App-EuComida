import { NgModule } from "@angular/core";
import { ShoppingCardService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { OrderService } from "../order/order.service";

@NgModule({
    providers:[ShoppingCardService, RestaurantsService, OrderService]
})

export class CoreModule{

}