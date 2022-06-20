import { Component, OnInit } from '@angular/core';
import { DrinkModel } from 'src/app/models/drink-model';
import { FoodModel } from 'src/app/models/food-model';
import { MenuModel } from 'src/app/models/menu-model';
import { SweetModel } from 'src/app/models/sweet-model';
import { DrinkService } from 'src/app/services/drink.service';
import { FoodService } from 'src/app/services/food.service';
import { MenuService } from 'src/app/services/menu.service';
import { SweetService } from 'src/app/services/sweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sweetList: SweetModel[] = [];
  drinkList: DrinkModel[] = [];
  foodList: FoodModel[] = [];
  menuList: MenuModel[] = [];

  constructor(private sweetService: SweetService, private drinkService: DrinkService, private foodService: FoodService,
      private menuService:MenuService) {
    this.getAllProducts();
  }

  getAllProducts() {
    this.sweetService.getSweets().subscribe(res => {
      console.log(res)
      if (res.success)
        this.sweetList = res.data;
      console.log(this.sweetList)
    });
    this.drinkService.getDrinks().subscribe(res => {
      if (res.success)
        this.drinkList = res.data;
      console.log(this.drinkList)
    });
    this.foodService.getFoods().subscribe(res => {
      if (res.success)
        this.foodList = res.data;
      console.log(this.foodList)
    });
    this.menuService.getMenus().subscribe(res => {
      if (res.success)
        this.menuList = res.data;
      console.log(this.menuList)
    });

  }

  ngOnInit(): void {
  }

}
