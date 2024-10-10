import { Product } from './../data-type';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';  
  userName: string = '';
  searchResult: undefined | Product[];
  cartItems: number = 0;
  constructor(private route: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if(val.url) {
        if(localStorage.getItem('seller') && val.url.includes('seller')) { //Checking if seller module
          let sellerStore = localStorage.getItem('seller'); 
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user'); 
          let userData = userStore && JSON.parse(userStore)[0];
          this.userName = userData.name;
          this.menuType = 'user';
        }
        else { //other than seller area
          this.menuType = 'default';
        }
      }
    })
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items: any) => {
      this.cartItems = items.length;
    })
  }
 
  sellerLogout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }
  searchProduct(query: KeyboardEvent) {
    if(query) {
      const element = (query.target as HTMLInputElement).value;
      this.productService.searchProducts(element).subscribe((product) => {
        if (product.length > 5) {
          product.length = 5;
        }
        this.searchResult = product;
      });
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }

  searchSubmit(query: string) {
    this.route.navigate([`search-product/${query}`]);
  }
  redirecttoDetailsPage(productId: string) {
    this.route.navigate([`product-details/${productId}`]);
  }
}
