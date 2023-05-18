import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { LoginModel } from 'src/app/models/login-model';
import AuthService from 'src/app/services/auth.service';


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
  // ngAfterViewInit(): void {
  //   this.google.accounts.id.initialize({
  //     client_id: "589966651105-ca8omk4l8df5omgrj1t9c45a928u4pvk.apps.googleusercontent.com",
  //     callback: (response: any) => this.handleGoogleSignIn(response)
  //   });
  //   this.google.accounts.id.renderButton(
  //     document.getElementById("buttonDiv"),
  //     { size: "large", type: "icon", shape: "pill" }  // customization attributes
  //   );
  // }

  login(){
    this.loginModel.email=this.loginForm.value.email as string;
    this.loginModel.password=this.loginForm.value.password as string;
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

  // handleGoogleSignIn(response: any) {
  //   console.log(response.credential);

  //   // This next is for decoding the idToken to an object if you want to see the details.
  //   let base64Url = response.credential.split('.')[1];
  //   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
  //   console.log(JSON.parse(jsonPayload));
  // }

  // signInWithGoogle(): void {
  //   this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // refreshToken(): void {
  //   this.socialService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  // }



}
