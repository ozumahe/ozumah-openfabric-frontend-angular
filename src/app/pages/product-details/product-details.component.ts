import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [ProductService],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  product = { name: '', price: 0, description: '', image: '' };
  loaded: boolean = false;

  ngOnInit(): void {
    console.log();

    this.getSingleProduct(
      this.activatedRoute.snapshot.paramMap.get('id') as string
    );
  }

  async getSingleProduct(id: string) {
    const product = await this.productService.getSingleProduct(id);
    this.product = product.data;
    this.loaded = true;
  }
}
