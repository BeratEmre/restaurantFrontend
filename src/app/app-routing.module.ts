import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { DrinkComponent } from './components/drink/drink.component';
import { FoodComponent } from './components/food/food.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { MyBasketComponent } from './components/my-basket/my-basket.component';
import { SignupComponent } from './components/signup/signup.component';
import { SweetComponent } from './components/sweet/sweet.component';
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
  {path:"**",pathMatch:"full",component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
