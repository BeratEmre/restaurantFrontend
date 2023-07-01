import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { LoginModel } from 'src/app/models/login-model';
import AuthService from 'src/app/services/auth.service';
// import { DataService } from 'src/app/services/data.service';
// import { DataService } from 'src/app/services/data.service';


// declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  loginModel=new LoginModel();
  loginForm=new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',Validators.required),
  })

  user: SocialUser;
  socialUser!: SocialUser;
  loggedIn: boolean;
  google:any
  constructor(private authService:AuthService, private router: Router,private socialService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialService.authState.subscribe((user) => {
      this.socialUser = user;
      console.log(this.socialUser);
    });
  }
  

  login(){
    this.loginModel.email=this.loginForm.value.email as string;
    this.loginModel.password=this.loginForm.value.password as string;
    // this.dataService.sendData("refresh");

    this.authService.login(this.loginModel).subscribe(s=>{
      localStorage.setItem('token',JSON.stringify(s.data));
      this.router.navigate(['/']);
    })
  }


  loginWithGoogle(): void {
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialService.signOut();
  }
}
