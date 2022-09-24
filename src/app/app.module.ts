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
import { SignupComponent } from './components/signup/signup.component';
import { MyBasketComponent } from './components/my-basket/my-basket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { AuthGuard } from './guard/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SweetComponent,
    FoodComponent,
    DrinkComponent,
    LoginComponent,
    SignupComponent,
    MyBasketComponent,
    MenuComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
