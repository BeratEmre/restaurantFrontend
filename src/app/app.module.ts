import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { FoodComponent } from './components/adminPages/food/food.component';
import { DrinkComponent } from './components/adminPages/drink/drink.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { MyBasketComponent } from './components/my-basket/my-basket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { AuthGuard } from './guard/auth-guard';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { DxDataGridModule } from 'devextreme-angular';
import { OrdersComponent } from './components/adminPages/orders/orders.component';
import { SweetComponent } from './components/adminPages/sweet/sweet.component';
import { MenuComponent } from './components/adminPages/menu/menu.component';
import { GoogleLoginProvider, SocialLoginModule,SocialAuthServiceConfig  } from 'angularx-social-login';
import { GettingPaidComponent } from './components/adminPages/getting-paid/getting-paid.component';
import { ProductCommentsComponent } from './components/popups/product-comments/product-comments.component';

const googleLoginOptions = {
  scope: 'profile email',
  plugin_name:'sample_login' //can be any name
};
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
    RegisterComponent,
    MyOrdersComponent,
    OrdersComponent,
    GettingPaidComponent,
    ProductCommentsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    DxDataGridModule,
    SocialLoginModule
  ],
  providers: [AuthGuard ,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '589966651105-ca8omk4l8df5omgrj1t9c45a928u4pvk.apps.googleusercontent.com',
              googleLoginOptions
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
