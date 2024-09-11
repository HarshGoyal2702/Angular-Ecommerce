import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Image, product } from '../data-type';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  image3!: string;
  showValue:boolean=false;
  Add:string = "Add"
  constructor(private product: ProductService, private user: UserService) { }

  onSubmit(data: product) {
    console.warn(data)
    this.product.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = "Product is Successfully added"
      }
      setTimeout(() => this.addProductMessage = undefined, 3000);
    })
  }


  AddBannerImages(image3: string) {
    let data = localStorage.getItem('seller')
    if (data) {
      let Data: Image = {
        image: image3,
        sellerName: JSON.parse(data)[0].name,
      }
      this.product.AddBannerImages(Data).subscribe((result) => {
        console.log(result);
      }

      )
    }
  }

  show(){
    this.showValue = !this.showValue;
   if(this.showValue){
     this.Add="Hide"
   }
   else{
    this.Add="Add"
   }
  }
}
