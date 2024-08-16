import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
productData : undefined | product;
productQuantity:number = 1;
quantity:number = 1;
removeCart= false;
  constructor(private activeRoute : ActivatedRoute,private product:ProductService){
   let productId =  this.activeRoute.snapshot.paramMap.get('productId');

   productId && this.product.getProduct(productId).subscribe((result)=>{
    this.productData = result;

    let cartData = localStorage.getItem('localCart');
    if(productId && cartData){
      let items = JSON.parse(cartData);
      items = items.filter((item:product)=>{
productId==item.id.toString()
      })
      if(items.length){
        this.removeCart= true;
      }else{
        this.removeCart= false;
      }
    }
   })

  }

  handleQuantity(val:string){
    if(val=="plus" &&  this.productQuantity<20){
      this.productQuantity += 1;
    }else if(val=="min" &&  this.productQuantity>1){
      this.productQuantity -= 1;
    }
  }

  AddToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        alert("Please login to add product to cart");
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      }
    }
  }

  removeToCart(productId:number){
    this.removeCart = false;
    this.product.removeItemFromCart(productId);
  }
}
