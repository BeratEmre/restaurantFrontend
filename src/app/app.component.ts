import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
  constructor(@Inject(DOCUMENT) document: Document) {
    var token=localStorage.getItem('token');
    if(token!=undefined && token!=null && token != '')
      this.isThisAdmin=true;
  }
  goto(id:string){
    console.log(id);
    var el= document.getElementById(id);
    var scrollTop=0;
    if (el!=undefined)           
      scrollTop = window.pageYOffset + el?.getBoundingClientRect().top-150;

    window.scrollTo({ top: scrollTop, behavior: 'smooth'});
  }
}
