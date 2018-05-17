import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { rotas } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { Order } from './order/order.model';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { LocationStrategy, HashLocationStrategy, registerLocaleData} from "@angular/common";
import { LoginComponent } from './security/login/login.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { ApplicationErrorHandler } from './app.error-handler';
import { AdminAreaComponent } from './admin-area/admin-area.component';
import { AddRestaurantComponent } from './admin-area/add-restaurant/add-restaurant.component';
import { AddRecipeComponent } from './admin-area/add-recipe/add-recipe.component';
import { RestaurantService } from './admin-area/add-restaurant/restaurant.service';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent,
    NotFoundComponent,
    LoginComponent,
    UserDetailComponent,
    AdminAreaComponent,
    AddRestaurantComponent,
    AddRecipeComponent

    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(), // ao importar o modulo desta forma, eu descarto a necessidade do CoreModule, pois ele mantem as instancias
    // CoreModule,
    RouterModule.forRoot(rotas, {preloadingStrategy: PreloadAllModules})// carregando os módulos em background
  ],
  providers: [  {provide: LocationStrategy, useClass: HashLocationStrategy}, 
                {provide: LOCALE_ID, useValue:'pt'}, RestaurantService,
                {provide: ErrorHandler, useClass: ApplicationErrorHandler}],
                bootstrap: [AppComponent],
                
})
export class AppModule { }
