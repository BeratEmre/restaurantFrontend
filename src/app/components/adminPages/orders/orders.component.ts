import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductType } from 'src/app/enums/product-type';
import DecodeToken from 'src/app/helper/decode-token';
import { OrderDtoModel } from 'src/app/models/orderDto-model';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderDtos: OrderDtoModel[];
  userId: number;
  drinkImgUrl = environment.imgUrl + '/drinks/';
  foodImgUrl = environment.imgUrl + '/foods/';
  sweetImgUrl = environment.imgUrl + '/sweets/';
  menuImgUrl = environment.imgUrl + '/menus/';
  constructor(private orderService: OrderService) {  

  }
  filterForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    productType: new FormControl(''),
    tableNumber: new FormControl(''),
    minPrice: new FormControl(''),
    maxPrice: new FormControl('')
  });


  ngOnInit(): void {
    this.userId = Number(DecodeToken.decode().id);
    this.getOrderDtos()
  }

  getOrderDtos() {
    this.orderService.getOrderDtos().subscribe(s => {
      if (s.success) {
        this.orderDtos = s.data
      }
    })
  }

  filterFormSubmit(){
    console.log(this.filterForm);
    this.orderService.getFilterOrder(this.filterForm.value).subscribe(r=>{
      console.log(r)
        if(r.success)
          this.orderDtos=r.data;        
    })
  }

}
