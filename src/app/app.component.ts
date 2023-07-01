import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { faCoffee, faSearch, faUserCircle, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import AuthService from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'restaurantFrontend';
  faCoffee = faCoffee;
  faUser = faUserCircle;
  faSearch = faSearch;
  isThisAdmin = false;
  faBars = faBars;
  faTimes = faTimes;
  navCloseVisible = false;
  adminNavCloseVisible = false;
  currentRoute='';
  private unsubscribe$ = new Subject<void>();
  
  constructor(@Inject(DOCUMENT) document: Document, private _authService: AuthService,private router: Router) {
    this.isCurrentUserAdmin();
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((event) => {
      if (event instanceof NavigationEnd)        
        this.currentRoute=event.url=='/'?'/anasayfa':event.url;      
    });
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  isCurrentUserAdmin() {
    var tokenModel = localStorage.getItem('token');
    if (tokenModel == undefined || tokenModel == null && tokenModel == '') { this.isThisAdmin = false; return; }

    console.log(tokenModel)
    var token=JSON.parse(tokenModel as string)
    console.log(token)
    console.log(token.token.toString())
    this._authService.isThisAdmin(token.token.toString()).subscribe(x => {
      console.log(x)
      this.isThisAdmin = x.success;
    })
  }

  goto(id: string) {
    console.log(id);
    var el = document.getElementById(id);
    var scrollTop = 0;
    if (el != undefined)
      scrollTop = window.pageYOffset + el?.getBoundingClientRect().top - 150;

    window.scrollTo({ top: scrollTop, behavior: 'smooth' });
  }

  onLogin(data: any){
    console.log(data)
    this.isThisAdmin=data
    
      // this.isCurrentUserAdmin();
  }
}
