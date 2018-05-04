import { CanDeactivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OrderComponent } from "./order.component";
import { Order } from "./order.model";

export class LeaveOrderGuard implements CanDeactivate<OrderComponent>{
    canDeactivate(order: OrderComponent, activatedRoute: ActivatedRouteSnapshot,
    routeState: RouterStateSnapshot): boolean{
        if(!order.isOrderCompleted()){
            return window.confirm("Deseja sair da compra? As suas informações não serão salvas.");
        }else{
            return true;
        }
    }
}