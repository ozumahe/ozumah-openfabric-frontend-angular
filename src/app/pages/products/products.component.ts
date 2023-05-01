import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import apiCall from 'src/app/utils/axois';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService],
})
export class ProductsComponent implements OnInit {
  constructor(public productsService: ProductService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts();
  }
}
