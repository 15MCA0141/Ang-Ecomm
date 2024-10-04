import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private router: Router) {}

  addProduct(product: Product) {
    return this.http.post('http://localhost:3000/products', product);
  }

  updateProduct(product: Product) {
    console.log(product.id);
    return this.http.put<Product>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  getProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: string) {
    return this.http.delete<Product[]>('http://localhost:3000/products/' + id);
  }

  reloadProducts() {
    this.router.navigate(['seller-home']);
  }

  getProduct(id: string) {
    return this.http.get<Product>('http://localhost:3000/products/' + id);
  }

  featuredProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=4');
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(`http://localhost:3000/products?name=${query}`);
  }
}
