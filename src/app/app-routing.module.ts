import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrinkComponent } from './components/drink/drink.component';
import { FoodComponent } from './components/food/food.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { MyBasketComponent } from './components/my-basket/my-basket.component';
import { SignupComponent } from './components/signup/signup.component';
import { SweetComponent } from './components/sweet/sweet.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"icecekler",component:DrinkComponent},
  {path:"yiyecekler",component:FoodComponent},
  {path:"tatlılar",component:SweetComponent},
  {path:"GirisYap",component:LoginComponent},
  {path:"Kaydol",component:SignupComponent},
  {path:"sepetim",component:MyBasketComponent},
  {path:"menu",component:MenuComponent},
  {path:"**",pathMatch:"full",component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
