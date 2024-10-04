import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  addProductMsg: string | undefined;
  errorMsg: string | undefined;
  selectedProduct: undefined | Product;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.productService.getProduct(productId).subscribe((result) => {
        this.selectedProduct = result;
      });
  }
  saveProduct(product: Product) {
    if (this.selectedProduct) {
      product.id = this.selectedProduct.id;
    }
      this.productService.updateProduct(product).subscribe((result) => {
        if (result) {
          this.addProductMsg = 'Product updated successfully!';
        }
      });
    setTimeout(() => {
      this.addProductMsg = undefined;
      this.errorMsg = undefined;
      this.router.navigate(['seller-home']);
    }, 3000);
  }
}
