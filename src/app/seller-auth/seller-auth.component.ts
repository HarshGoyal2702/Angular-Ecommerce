import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  constructor(private seller: SellerService, private router: Router) {}
  showLogin:boolean = false;
  authError:string = "";
  ngOnInit(): void {}
  signUp(data: signUp): void {
    console.log(data);
    this.seller.userSignUp(data)
  }
  login(data: login): void {
    console.log(data);
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or Password is not Correct";
      }
    })
  }
  openLogin(){
    this.showLogin = true;
  }
  openSignUp(){
    this.showLogin = false;
  }
}
