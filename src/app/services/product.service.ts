import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Product } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<Product | []>();
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
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(product: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart) {
      localStorage.setItem('localCart', JSON.stringify([product]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(product);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
  localRemoveFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if(cartData) {
      let items: Product[]|any = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  removeFromCart(productId: string) {
    return this.http.delete<Cart[]>('http://localhost:3000/cart/' + productId); 
  }
}
