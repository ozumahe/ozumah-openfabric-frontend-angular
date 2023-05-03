import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

import { ProductService } from 'src/app/services/product/product.service';
import apiCall from 'src/app/utils/axois';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService],
})
export class ProductsComponent implements OnInit {
  constructor(
    public productsService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts();
    this.authService.checkAuth();
  }
}
