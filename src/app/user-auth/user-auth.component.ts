import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { login, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  showLogin:boolean = true;

  authError:string ='';
  constructor(private user:UserService ){
    this.user.userAuthReload();
  }
  signUp(data:signUp){
    this.user.userSignUp(data);
  }

  login(data:login){
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result)=>{
      if(result){
        this.authError = "Please enter valid user Details"
      }
    })
  }
  openLogin(){
    this.showLogin=true;
  }

  openSignUp(){
    this.showLogin=false;

  }
}
