import { Component, Input, OnInit } from '@angular/core';
import { faCheckCircle, faPlusSquare, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { OrderDetailStatus } from 'src/app/enums/order-detail-status';
import { ProductType } from 'src/app/enums/product-type';
import DecodeToken from 'src/app/helper/decode-token';
import { BasketModel } from 'src/app/models/basket-model';
import { FoodModel } from 'src/app/models/food-model';
import { OrderModel } from 'src/app/models/order';
import { ProductCard } from 'src/app/models/product-card';
import { FavoriteProductService } from 'src/app/services/favoriteProduct.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';
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
  imgUrl = environment.imgUrl;
  successMessageBox=false;
  faTrash = faTrash;
  faPlus = faPlusSquare
  faCheckCircle=faCheckCircle;
  faTimes=faTimes;
  successMessage="";
  userId = 0;
  basketList: BasketModel[] = [];
  recommendedProducts:ProductCard[]
  constructor(private orderDetailService: OrderDetailService, private orderService:OrderService, private _favoriteProductService:FavoriteProductService) {
    this.userId = Number(DecodeToken.decode().id);
    this.getOrders();
    this.getRecommendedProducts();
  }
  // @Input() basketList!: string;
  ngOnInit(): void { }


  getOrders() {
    if (this.userId == 0) { return }
    console.log(this.userId)
    this.orderDetailService.getBasketWithUserId(this.userId).subscribe(res => {

      if (!res.success || res.data == null || res.data.length < 1) { return }
      this.basketList = res.data;
    });
  }

  getRecommendedProducts(){
    this._favoriteProductService.getFavoriteProductsTopx(3).subscribe(s=>{
      if (s.success) {
        this.recommendedProducts = s.data;
      }
    })
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
    orderModel.status = OrderDetailStatus.basket;

    this.orderDetailService.deleteBasket(orderModel).subscribe(o => {
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
    orderModel.status = OrderDetailStatus.basket;

    this.orderDetailService.deleteBasket(orderModel).subscribe(o => {
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
    orderModel.status = OrderDetailStatus.basket;

    this.orderDetailService.deleteBasket(orderModel).subscribe(o => {
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
    orderModel.status = OrderDetailStatus.basket;

    this.orderDetailService.deleteBasket(orderModel).subscribe(o => {
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

    this.orderDetailService.addBasket(order).subscribe(p => {
      if (p.success)
        this.basketList.forEach(b => { if (b.id == p.data.foodId) { b.count++ } });
    })
  }

  addToCardSweet(id: number) {
    var order = new OrderModel();
    order.sweetId = id;
    order.userId = this.userId;

    this.orderDetailService.addBasket(order).subscribe(p => {
      if (p.success)
        this.basketList.forEach(b => { if (b.id == p.data.sweetId) { b.count++ } });
    })
  }

  addToCardDrink(id: number) {
    var order = new OrderModel();
    order.drinkId = id;
    order.userId = this.userId;

    this.orderDetailService.addBasket(order).subscribe(p => {
      if (p.success)
        this.basketList.forEach(b => { if (b.id == p.data.drinkId) { b.count++ } });
    })
  }

  addToCardMenu(id: number) {
    var order = new OrderModel();
    order.menuId = id;
    order.userId = this.userId;

    this.orderDetailService.addBasket(order).subscribe(p => {
      if (p.success) {
        // if (this.basketList.some(s=>s.id==p.data.menuId)) 
          this.basketList.forEach(b => { if (b.id == p.data.menuId) { b.count++ } });
        // else{
        //   this.orderDetailService.getBasket
        // }
      }
    })
  }
  addToCard(productType:number){
    console.log(productType)
    switch (productType) {
      case ProductType.drink:
        this.addToCardDrink(productType);
        break;

      case ProductType.food:
        this.addToCardFood(productType);
        break;

      case ProductType.sweet:
        this.addToCardSweet(productType);
        break;

      case ProductType.menu:
        this.addToCardMenu(productType);
        break;
    }
  }
  
  //#endregion
  sumBasketPrice() {
    var res = 0;
    this.basketList.forEach(f => { res = res + f.count * f.price })
    return res;
  }

  //#region 
  addOrder(){
    this.orderService.addOrder(this.userId).subscribe(o=>{
      console.log(o)
      if (o.success) {
        this.successMessageBox=true;
        this.successMessage=o.message;
        this.basketList=[];
      }
    })
    this.userId
  }
  //#endregion
  closeSuccessMessageBox(){
    this.successMessage="";
    this.successMessageBox=false;
  }
}
