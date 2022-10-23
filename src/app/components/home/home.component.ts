import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { OrderStatus } from 'src/app/enums/order-status';
import { ProductType } from 'src/app/enums/product-type';
import DecodeToken from 'src/app/helper/decode-token';
import { BasketModel } from 'src/app/models/basket-model';
import { DrinkModel } from 'src/app/models/drink-model';
import { FoodModel } from 'src/app/models/food-model';
import { MenuModel } from 'src/app/models/menu-model';
import { OrderModel } from 'src/app/models/order';
import { SweetModel } from 'src/app/models/sweet-model';
import { DrinkService } from 'src/app/services/drink.service';
import { FoodService } from 'src/app/services/food.service';
import { MenuService } from 'src/app/services/menu.service';
import { OrderService } from 'src/app/services/order.service';
import { SweetService } from 'src/app/services/sweet.service';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  drinkImgUrl = environment.imgUrl + '/drinks/';
  foodImgUrl = environment.imgUrl + '/foods/';
  sweetImgUrl = environment.imgUrl + '/sweets/';
  menuImgUrl = environment.imgUrl + '/menus/';
  faTrash = faTrash;
  faPlus = faPlus;
  sweetList: SweetModel[] = [];
  drinkList: DrinkModel[] = [];
  foodList: FoodModel[] = [];
  menuList: MenuModel[] = [];
  menuStarList: MenuModel[] = [];
  basketList: BasketModel[] = [];
  userId: number = 0;

  // @Output() public sendData=new EventEmitter();
  // sendBasket(){
  //   this.sendData.emit(JSON.stringify(this.basketList));
  //   this.router.navigate(['/sepetim']);
  // }
  constructor(private sweetService: SweetService, private drinkService: DrinkService, private foodService: FoodService,
    private menuService: MenuService, private orderService: OrderService) {
    this.userId = Number(DecodeToken.decode().id);
    this.getAllProducts();
    this.getOrders()
  }
  ngOnInit(): void {
  }

  getAllProducts() {
    this.sweetService.getSweets().subscribe(res => {
      if (res.success)
        this.sweetList = res.data;
    });
    this.drinkService.getDrinks().subscribe(res => {
      if (res.success)
        this.drinkList = res.data;
    });
    this.foodService.getFoods().subscribe(res => {
      if (res.success)
        this.foodList = res.data;
    });
    this.menuService.getMenus().subscribe(res => {
      if (res.success)
        this.menuList = res.data;
    });
    this.menuService.getMenus().subscribe(res => {
      if (res.success)
        this.menuStarList = res.data;
    });
  }

  getOrders() {
    if (this.userId == 0) { return }
    console.log(this.userId)
    this.orderService.getBasketWithUserId(this.userId).subscribe(res => {

      if (!res.success || res.data == null || res.data.length < 1) { return }
      this.basketList = res.data;
    });
  }

  addToCardFood(id: number) {
    var order = new OrderModel();
    order.foodId = id;

    order.userId = this.userId;
    var isItAlreadyAdded: Boolean = false
    if (this.basketList.length > 0) {
      isItAlreadyAdded = this.basketList.some(b => b.type == ProductType.food && b.id == order.foodId);
    }

    this.orderService.addBasket(order).subscribe(p => {
      if (p.success) {
        if (!isItAlreadyAdded) {
          var orderFood = new FoodModel();
          var food = this.foodList.find(f => f.foodId == p.data.foodId);
          if (food != undefined)
            orderFood = food;

          var basket: BasketModel = { id: p.data.foodId, name: orderFood.name, price: orderFood.price, type: ProductType.food, count: 1, imgUrl: this.foodImgUrl + orderFood.imgUrl };
          this.basketList.push(basket);
        }
        else
          this.basketList.forEach(b => { if (b.id == p.data.foodId) { b.count++ } });
      }
    })
  }

  addToCardSweet(id: number) {
    var order = new OrderModel();
    order.sweetId = id;

    order.userId = this.userId;
    var isItAlreadyAdded: Boolean = false
    if (this.basketList.length > 0) {
      isItAlreadyAdded = this.basketList.some(b => b.type == ProductType.sweet && b.id == order.sweetId);
    }

    this.orderService.addBasket(order).subscribe(p => {
      if (p.success) {
        if (!isItAlreadyAdded) {
          var orderSweet = new SweetModel();
          var sweet = this.sweetList.find(f => f.sweetId == p.data.sweetId);
          if (sweet != undefined)
            orderSweet = sweet;

          var basket: BasketModel = { id: p.data.sweetId, name: orderSweet.name, price: orderSweet.price, type: ProductType.sweet, count: 1, imgUrl: this.sweetImgUrl + orderSweet.imgUrl };
          this.basketList.push(basket);
        }
        else
          this.basketList.forEach(b => { if (b.id == p.data.sweetId) { b.count++ } });
      }
    })
  }

  addToCardDrink(id: number) {
    var order = new OrderModel();
    order.drinkId = id;

    order.userId = this.userId;
    var isItAlreadyAdded: Boolean = false
    if (this.basketList.length > 0) {
      isItAlreadyAdded = this.basketList.some(b => b.type == ProductType.drink && b.id == order.drinkId);
    }

    this.orderService.addBasket(order).subscribe(p => {
      if (p.success) {
        if (!isItAlreadyAdded) {
          var orderDrink = new DrinkModel();
          var drink = this.drinkList.find(f => f.drinkId == p.data.drinkId);
          if (drink != undefined)
            orderDrink = drink;

          var basket: BasketModel = { id: p.data.drinkId, name: orderDrink.name, price: orderDrink.price, type: ProductType.drink, count: 1, imgUrl: this.drinkImgUrl + orderDrink.imgUrl };
          this.basketList.push(basket);
        }
        else
          this.basketList.forEach(b => { if (b.id == p.data.drinkId) { b.count++ } });
      }
    })
  }
  addToCardMenu(id: number) {
    var order = new OrderModel();
    order.menuId = id;

    order.userId = this.userId;
    var isItAlreadyAdded: Boolean = false
    if (this.basketList.length > 0)
      isItAlreadyAdded = this.basketList.some(b => b.type == ProductType.menu && b.id == order.menuId);


    this.orderService.addBasket(order).subscribe(p => {
      if (p.success) {
        if (!isItAlreadyAdded) {
          var orderMenu = new MenuModel();
          var menu = this.menuList.find(f => f.menuId == p.data.menuId);
          if (menu != undefined)
            orderMenu = menu;

          var basket: BasketModel = { id: p.data.menuId, name: orderMenu.name, price: orderMenu.price, type: ProductType.menu, count: 1, imgUrl: this.menuImgUrl + orderMenu.imgUrl };
          this.basketList.push(basket);
        }
        else
          this.basketList.forEach(b => { if (b.id == p.data.menuId) { b.count++ } });
      }
    })
  }

  basketSum(): Number {
    var res = 0
    this.basketList.forEach(f => { res = res + f.price })
    return res;
  }

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
}

