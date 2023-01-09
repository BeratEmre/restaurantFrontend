import { Component, OnInit } from '@angular/core';
import DecodeToken from 'src/app/helper/decode-token';
import { BasketModel } from 'src/app/models/basket-model';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
import { ProductType } from 'src/app/enums/product-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  basketDtos: BasketModel[];
  userId: number;
  drinkImgUrl = environment.imgUrl + '/drinks/';
  foodImgUrl = environment.imgUrl + '/foods/';
  sweetImgUrl = environment.imgUrl + '/sweets/';
  menuImgUrl = environment.imgUrl + '/menus/';
  ordersTotalPrice:number=0;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.userId = Number(DecodeToken.decode().id);
    this.getBasketDtos()
  }

  getBasketDtos() {
    this.orderService.getBasketWithUserId(this.userId).subscribe(s => {
      if (s.success) {
        console.log(s.data)
        s.data.forEach(el => {
          this.ordersTotalPrice=this.ordersTotalPrice+el.price*el.count;
          switch (el.type) {
            case ProductType.food:
              el.imgUrl = this.foodImgUrl + el.imgUrl;
              break;
            case ProductType.drink:
              el.imgUrl = this.drinkImgUrl + el.imgUrl;
              break;
            case ProductType.sweet:
              el.imgUrl = this.sweetImgUrl + el.imgUrl;
              break;
            case ProductType.menu:
              el.imgUrl = this.menuImgUrl + el.imgUrl;
              break;
          }
        });
        this.basketDtos = s.data
      }
    })
  }
}