import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrinkComponent } from './components/drink/drink.component';
import { FoodComponent } from './components/food/food.component';
import { HomeComponent } from './components/home/home.component';
import { SweetComponent } from './components/sweet/sweet.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"icecekler",component:DrinkComponent},
  {path:"yiyecekler",component:FoodComponent},
  {path:"tatlılar",component:SweetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }