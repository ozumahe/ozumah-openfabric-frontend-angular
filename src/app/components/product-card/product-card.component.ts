import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/utils/types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers: [ProductService],
})
export class ProductCardComponent {
  constructor(public productService: ProductService, private router: Router) {}
  @Input()
  product!: Product;

  handeleDelete(id: string) {
    this.productService.deleteProduct(id);
  }

  viewProduct(id: string) {
    this.router.navigate(['/product', id]);
  }
}
