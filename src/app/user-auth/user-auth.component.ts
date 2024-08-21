import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  showLogin: boolean = true;

  authError: string = '';
  constructor(private user: UserService, private product: ProductService) {
    this.user.userAuthReload();
  }
  signUp(data: signUp) {
    this.user.userSignUp(data);
  }

  login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid user Details"
      } else {
        this.LocalCartToRemoteCart();
      }
    })
  }
  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;

  }

  LocalCartToRemoteCart() {
    let Data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (Data) {
      let cartDataList: product[] = JSON.parse(Data)

      cartDataList.forEach((product: product,index) => {
        let cartData: cart = {
          ...product, productId: product.id, userId
        }

        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("item store in db");

            }

            if(cartDataList.length === index+1){
              localStorage.removeItem('localCart');
            }
          })
        }, 500)
      })
    }

setTimeout(()=>{
  this.product.getCartList(userId)
},200)
  }
}
