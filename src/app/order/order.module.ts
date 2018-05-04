import { NgModule } from "@angular/core";
import { OrderComponent } from "./order.component";
import { OrderListComponent } from "./order-list/order-list.component";
import { DeliveryCostsComponent } from "../delivery-costs/delivery-costs.component";
import { SharedModule } from "../shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { LeaveOrderGuard } from "./leave-order.guard";

const ROTAS: Routes = [
    {path:'', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
]

@NgModule({
    declarations:[OrderComponent, OrderListComponent, DeliveryCostsComponent],
    imports: [SharedModule, RouterModule.forChild(ROTAS)]
})

export class OrderModule{

}