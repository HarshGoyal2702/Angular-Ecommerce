import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductMessage:string| undefined;
  constructor(private product:ProductService){}

  onSubmit(data:product){
    console.warn(data)
    this.product.addProduct(data).subscribe((result)=>{
      console.log(result);
      if(result){
        this.addProductMessage = "Product is Successfully added"
      }
      setTimeout(()=> this.addProductMessage = undefined,3000);
    })
  }
}
