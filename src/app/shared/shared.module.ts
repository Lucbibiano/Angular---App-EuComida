import { NgModule, ModuleWithProviders } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ShoppingCardService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { OrderService } from "../order/order.service";
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from "./messages/notification.service";
import { LoginService } from "../security/login/login.service";
import { LoggedInGuard } from "../security/login/loggedIn.guard";
import { LeaveOrderGuard } from "../order/leave-order.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../security/auth.interceptor";


@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    exports: [InputComponent, RadioComponent, RatingComponent,
              FormsModule, ReactiveFormsModule, CommonModule, SnackbarComponent] // Estes componentes que foram exportados são componentes importantes para 
              // os componentes utilizados neste módulo, então, exportando estes módulos, módulos que utilizarem este módulo não precisarão exportar
              // estas dependencias novamente.
              
})

//importar módulo com providers, ajuda a manter a instancia dos serviços.
export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return{
            ngModule: SharedModule,
            providers: [ShoppingCardService,
                        RestaurantsService,
                        LeaveOrderGuard,
                        OrderService,
                        NotificationService,
                        LoginService,
                        LoggedInGuard,
                        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
                    ]
        }
    }
}

