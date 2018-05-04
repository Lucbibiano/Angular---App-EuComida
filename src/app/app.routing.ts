import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";
import { OrderSummaryComponent } from "./order-summary/order-summary.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "./security/login/login.component";
import { LoggedInGuard } from "./security/login/loggedIn.guard";
import { AdminAreaComponent } from "./admin-area/admin-area.component";
import { AddRestaurantComponent } from "./admin-area/add-restaurant/add-restaurant.component";
import { AddRecipeComponent } from "./admin-area/add-recipe/add-recipe.component";

export const rotas: Routes = [
      {path: '', component: HomeComponent },
      {path: 'login/:to', component: LoginComponent },
      {path: 'login', component: LoginComponent },
      {path: 'admin', component: AdminAreaComponent,
      children:[
            {path: 'addrestaurant', component: AddRestaurantComponent },
            {path: 'addrecipe', component: AddRecipeComponent },
      ]},
      {path: 'restaurants/:id', component: RestaurantDetailComponent,
            children: [
                  { path: '', redirectTo: 'menu', pathMatch: 'full' },
                  { path: 'menu', component: MenuComponent },
                  { path: 'reviews', component: ReviewsComponent }
            ]
      },
      {path: 'restaurants', component: RestaurantsComponent },
      {path: 'order', loadChildren: './order/order.module#OrderModule', 
            canLoad: [LoggedInGuard], canActivate: [LoggedInGuard]},
      {path: 'order-summary', component: OrderSummaryComponent},
      {path: 'about', loadChildren: './about/about.module#AboutModule' }, //Carrega o componente utilizando lazy loading]
      {path: '**', component: NotFoundComponent }
]