import { Component, OnInit } from '@angular/core';
import { faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-basket',
  templateUrl: './my-basket.component.html',
  styleUrls: ['./my-basket.component.css']
})
export class MyBasketComponent implements OnInit {
  faTrash=faTrash;
  faPlus=faPlusSquare
  constructor() { }

  ngOnInit(): void {
  }

}
