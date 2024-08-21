import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  totalPrice: number | undefined;
  cartData:cart[]| undefined;
  orderMsg :string | undefined;

  constructor(private product: ProductService, private router: Router) {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * + item.quantity);
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);

      console.warn(this.totalPrice)
    })

  }


  orderNow(data: { email: string, address: string, contact: string }) {
    console.warn(data)
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(this.totalPrice){
      let orderData:order={
        ...data,totalPrice : this.totalPrice,userId,id:undefined
      }
      this.cartData?.forEach((item)=>{
        setTimeout(()=>{
          item.id && this.product.deleteCartItems(item.id);
        }, 700);
         })
      this.product.orderNow(orderData).subscribe((result)=>{
        // console.log(result)
       this.orderMsg = "Your order has been placed.";
       setTimeout(() => {
        
         this.router.navigate(['/my-orders']);
         this.orderMsg =undefined
       }, 4000);
      })
    }
  }
}
