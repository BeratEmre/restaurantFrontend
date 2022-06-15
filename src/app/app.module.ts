import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { SweetComponent } from './components/sweet/sweet.component';
import { FoodComponent } from './components/food/food.component';
import { DrinkComponent } from './components/drink/drink.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyBasketComponent } from './components/my-basket/my-basket.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SweetComponent,
    FoodComponent,
    DrinkComponent,
    LoginComponent,
    SignupComponent,
    MyBasketComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
