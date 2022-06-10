import { Component, OnInit } from '@angular/core';
import { SweetModel } from 'src/app/models/sweet-model';
import { SweetService } from 'src/app/services/sweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sweetList: SweetModel[] = [];
  constructor(private sweetService: SweetService) {
    sweetService.getSweets().subscribe(res => {
      if (res.succes = true)
        this.sweetList = res.data;
        console.log(this.sweetList)
    });
  }

  ngOnInit(): void {
  }

}
