import { Component } from '@angular/core';
import { faCoffee, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurantFrontend';
  faCoffee = faCoffee;
  faUser = faUserCircle;
  faSearch = faSearch;
  isThisAdmin=false;
  constructor() {
    var token=localStorage.getItem('token');
    if(token!=undefined && token!=null && token != '')
      this.isThisAdmin=true;
  }
}
