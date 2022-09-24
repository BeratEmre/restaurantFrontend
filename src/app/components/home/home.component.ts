import { Component, OnInit } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  drinkImgUrl=environment.imgUrl+'/drinks/';
  foodImgUrl=environment.imgUrl+'/foods/';
  sweetImgUrl = environment.imgUrl + '/sweets/';
  menuImgUrl = environment.imgUrl + '/menus/';
  faTrash=faTrash;
  faPlus=faPlus;
  sweetList: SweetModel[] = [];
  drinkList: DrinkModel[] = [];
  foodList: FoodModel[] = [];
  menuList: MenuModel[] = [];
  basketList:BasketModel[]=[];
  
  constructor(private sweetService: SweetService, private drinkService: DrinkService, private foodService: FoodService,
      private menuService:MenuService, private orderService:OrderService) {
    this.getAllProducts();
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

  }

  ngOnInit(): void {
  }
  addToCard(food:FoodModel){
     var order=new OrderModel();
     order.foodId=food.foodId;

    order.userId=Number(DecodeToken.decode().id)
    var isItAlreadyAdded:Boolean=false
    if (this.basketList.length>0 ) {
      isItAlreadyAdded = this.basketList.some(b=>b.type == ProductType.food && b.id == order.foodId);
    }

    this.orderService.addBasket(order).subscribe(p=>{
      if (p.success) {
        if (!isItAlreadyAdded) {
          var orderFood=new FoodModel();
          var food=this.foodList.find(f=>f.foodId==p.data.foodId);
          if (food!=undefined) 
            orderFood= food;      
    
          var basket:BasketModel={id:p.data.foodId, name:orderFood.name, price:orderFood.price, type:ProductType.food, count:1};
          this.basketList.push(basket);
        }
        else{
          this.basketList.forEach(b=>{ if (b.id==p.data.foodId) { b.count++}});
        }
     
      }     
    })
  }

  basketSum(): Number{
    var res=0
    this.basketList.forEach(f=>{res=res+f.price})
    return res;
  }
}
