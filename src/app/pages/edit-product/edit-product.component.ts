import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ProductService],
})
export class EditProductComponent implements OnInit {
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
