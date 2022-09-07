import { DrinkModel } from "./drink-model";
import { FoodModel } from "./food-model";
import { SweetModel } from "./sweet-model";

export class MenuModel {
    menuId: number = 0;
    name: string = '';
    description: string = '';
    imgUrl:string='';
    price:number=0;

    foodId: number = 0;
    food: FoodModel = new FoodModel();

    drinkId: number = 0;
    drink: DrinkModel = new DrinkModel();

    sweetId: number = 0;
    sweet: SweetModel = new SweetModel();
}