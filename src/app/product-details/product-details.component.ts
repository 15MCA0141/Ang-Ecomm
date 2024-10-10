import { Component } from '@angular/core';
import { Cart, Product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  selectedProduct: undefined|Product;
  productQty: number = 1;
  removeCart: boolean = false;
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {}


  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.productService.getProduct(productId).subscribe((result) => {
      this.selectedProduct = result;

      let cartData = localStorage.getItem('localCart');
      if(productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId === item.id);
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
    });
  }

  handleQuantity(val: string) {
    if(val === 'minus' && this.productQty>1) {
        this.productQty--;
    }
    else if(val === 'plus' && this.productQty<10) {
        this.productQty++;
    }
  }

  addToCart() {
    if(this.selectedProduct) {
      this.selectedProduct.quantity = this.productQty;
      if(!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.selectedProduct);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        let cartData: Cart = {
          ...this.selectedProduct,
          userId, 
          productId: this.selectedProduct.id
        }
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result) => {
          console.log(result);
          if(result) {
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeFromCart(productToDelete: string) {
    if(!localStorage.getItem('user')) {
      this.productService.localRemoveFromCart(productToDelete);
      this.removeCart = false;
    } else {
      this.productService.removeFromCart(productToDelete).subscribe((result) => {
        console.log(result);
        this.removeCart = false;
      });
    }
  }
}
