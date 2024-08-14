import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient ) { }

  addProduct(data:product){
    return this.http.post('http://localhost:3000/products',data);
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product);
  }
  popularProduct(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit-3')
  }
  trendyProduct(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit-8')
  }
  searchProduct(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }
}

