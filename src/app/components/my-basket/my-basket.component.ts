import { Component, Input, OnInit } from '@angular/core';
import { faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { OrderStatus } from 'src/app/enums/order-status';
import { ProductType } from 'src/app/enums/product-type';
import DecodeToken from 'src/app/helper/decode-token';
import { BasketModel } from 'src/app/models/basket-model';
import { FoodModel } from 'src/app/models/food-model';
import { OrderModel } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-basket',
  templateUrl: './my-basket.component.html',
  styleUrls: ['./my-basket.component.css']
})
export class MyBasketComponent implements OnInit {
  drinkImgUrl = environment.imgUrl + '/drinks/';
  foodImgUrl = environment.imgUrl + '/foods/';
  sweetImgUrl = environment.imgUrl + '/sweets/';
  menuImgUrl = environment.imgUrl + '/menus/';

  faTrash = faTrash;
  faPlus = faPlusSquare
  userId = 0;
  basketList: BasketModel[] = [];
  constructor(private orderService: OrderService) {
    this.userId = Number(DecodeToken.decode().id);
    this.getOrders()
  }
  // @Input() basketList!: string;
  ngOnInit(): void { }


  getOrders() {
    if (this.userId == 0) { return }
    console.log(this.userId)
    this.orderService.getBasketWithUserId(this.userId).subscribe(res => {

      if (!res.success || res.data == null || res.data.length < 1) { return }
      this.basketList = res.data;
    });
  }

  basketListCount() {
    return this.basketList.length + ' Ürün';
  }

  //#region "Delete Basket
  deleteBasket(basket: BasketModel) {
    switch (basket.type) {
      case ProductType.drink:
        this.deleteToCardDrink(basket.id);
        break;

      case ProductType.food:
        this.deleteToCardFood(basket.id);
        break;

      case ProductType.sweet:
        this.deleteToCardSweet(basket.id);
        break;

      case ProductType.menu:
        this.deleteToCardMenu(basket.id);
        break;
    }
  }


  deleteToCardDrink(drinkId: number) {
    var orderModel = new OrderModel();
    orderModel.drinkId = drinkId;
    orderModel.userId = this.userId;
    orderModel.status = OrderStatus.basket;

    this.orderService.deleteBasket(orderModel).subscribe(o => {
      if (o.data == 0) {
        var index = this.basketList.findIndex(b => b.id != drinkId && b.type != ProductType.drink);
        this.basketList.splice(index, 1);
        return;
      }

      var basket = this.basketList.find(b => b.id == drinkId && b.type == ProductType.drink);
      if (basket != null && basket != undefined) {
        this.basketList.forEach(b => {
          if (b != undefined && b.id == drinkId && b.type == ProductType.drink)
            b.count = o.data;
        });
      }
    })
  }

  deleteToCardFood(foodId: number) {
    var orderModel = new OrderModel();
    orderModel.foodId = foodId;
    orderModel.userId = this.userId;
    orderModel.status = OrderStatus.basket;

    this.orderService.deleteBasket(orderModel).subscribe(o => {
      if (o.data == 0) {
        var index = this.basketList.findIndex(b => b.id == foodId && b.type == ProductType.food);
        this.basketList.splice(index, 1)
        return;
      }

      var basket = this.basketList.find(b => b.id == foodId && b.type == ProductType.food);
      if (basket != null && basket != undefined) {
        this.basketList.forEach(b => {
          if (b != undefined && b.id == foodId && b.type == ProductType.food)
            b.count = o.data;
        });
      }
    })
  }

  deleteToCardSweet(sweetId: number) {
    var orderModel = new OrderModel();
    orderModel.sweetId = sweetId;
    orderModel.userId = this.userId;
    orderModel.status = OrderStatus.basket;

    this.orderService.deleteBasket(orderModel).subscribe(o => {
      if (o.data == 0) {
        var index = this.basketList.findIndex(b => b.id == sweetId && b.type == ProductType.sweet);
        this.basketList.splice(index, 1)
        return;
      }

      var basket = this.basketList.find(b => b.id == sweetId && b.type == ProductType.sweet);
      if (basket != null && basket != undefined) {
        this.basketList.forEach(b => {
          if (b != undefined && b.id == sweetId && b.type == ProductType.sweet)
            b.count = o.data;
        });
      }
    })
  }

  deleteToCardMenu(menuId: number) {
    var orderModel = new OrderModel();
    orderModel.menuId = menuId;
    orderModel.userId = this.userId;
    orderModel.status = OrderStatus.basket;

    this.orderService.deleteBasket(orderModel).subscribe(o => {
      if (o.data == 0) {
        var index = this.basketList.findIndex(b => b.id == menuId && b.type == ProductType.menu);
        this.basketList.splice(index, 1)
        return;
      }

      var basket = this.basketList.find(b => b.id == menuId && b.type == ProductType.menu);
      if (basket != null && basket != undefined) {
        this.basketList.forEach(b => {
          if (b != undefined && b.id == menuId && b.type == ProductType.menu)
            b.count = o.data;
        });
      }
    })
  }
  //#endregion "My Region"

  //#region Add Card
  increaseBasket(basket: BasketModel) {
    switch (basket.type) {
      case ProductType.drink:
        this.addToCardDrink(basket.id);
        break;

      case ProductType.food:
        this.addToCardFood(basket.id);
        break;

      case ProductType.sweet:
        this.addToCardSweet(basket.id);
        break;

      case ProductType.menu:
        this.addToCardMenu(basket.id);
        break;
    }
  }


  addToCardFood(id: number) {
    var order = new OrderModel();
    order.foodId = id;
    order.userId = this.userId;

    this.orderService.addBasket(order).subscribe(p => {
      if (p.success)
        this.basketList.forEach(b => { if (b.id == p.data.foodId) { b.count++ } });
    })
  }

  addToCardSweet(id: number) {
    var order = new OrderModel();
    order.sweetId = id;
    order.userId = this.userId;

    this.orderService.addBasket(order).subscribe(p => {
      if (p.success)
        this.basketList.forEach(b => { if (b.id == p.data.sweetId) { b.count++ } });
    })
  }

  addToCardDrink(id: number) {
    var order = new OrderModel();
    order.drinkId = id;
    order.userId = this.userId;

    this.orderService.addBasket(order).subscribe(p => {
      if (p.success)
        this.basketList.forEach(b => { if (b.id == p.data.drinkId) { b.count++ } });
    })
  }

  addToCardMenu(id: number) {
    var order = new OrderModel();
    order.menuId = id;
    order.userId = this.userId;

    this.orderService.addBasket(order).subscribe(p => {
      if (p.success) 
          this.basketList.forEach(b => { if (b.id == p.data.menuId) { b.count++ } });
    })
  }
  
  //#endregion
  sumBasketPrice() {
    var res = 0;
    this.basketList.forEach(f => { res = res + f.price })
    return res;
  }
}
