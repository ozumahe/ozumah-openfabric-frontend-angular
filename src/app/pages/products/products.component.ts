import { Component } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService],
})
export class ProductsComponent {
  constructor(private productsService: ProductService) {}

  products = this.productsService.products;
}
