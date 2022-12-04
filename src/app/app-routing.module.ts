import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { OrdersComponent } from './components/adminPages/orders/orders.component';
import { DrinkComponent } from './components/adminPages/drink/drink.component';
import { FoodComponent } from './components/adminPages/food/food.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/adminPages/menu/menu.component';
import { MyBasketComponent } from './components/my-basket/my-basket.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SignupComponent } from './components/signup/signup.component';
import { SweetComponent } from './components/adminPages/sweet/sweet.component';
import { AuthGuard } from './guard/auth-guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"icecekler",component:DrinkComponent},
  {path:"yiyecekler",component:FoodComponent},
  {path:"tatlılar",component:SweetComponent},
  {path:"Kaydol",component:SignupComponent},
  {path:"sepetim",component:MyBasketComponent},
  {path:"menu",component:MenuComponent, canActivate: [AuthGuard]},
  {path:"kayitol",component:RegisterComponent},
  {path:"girisyap",component:LoginComponent},
  {path:"siparislerim",component:MyOrdersComponent},
  {path:"siparisler",component:OrdersComponent},
  {path:"**",pathMatch:"full",component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
