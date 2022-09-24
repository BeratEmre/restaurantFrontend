import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login-model';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel=new LoginModel();
  loginForm=new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',Validators.required),
  })

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.loginModel.email=this.loginForm.value.email as string;
    this.loginModel.password=this.loginForm.value.password as string;
    this.authService.login(this.loginModel).subscribe(s=>{
      localStorage.setItem('token',JSON.stringify(s.data));
      this.router.navigate(['/']);
    })
  }
}
