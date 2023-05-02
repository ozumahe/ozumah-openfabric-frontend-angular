import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import apiCall from 'src/app/utils/axois';

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

  name = new FormControl('');
  price = new FormControl(0);
  description = new FormControl('');
  imageBase64: string = '';
  productId = '';
  ngOnInit(): void {
    console.log();

    this.getSingleProduct(
      this.activatedRoute.snapshot.paramMap.get('id') as string
    );
    this.productId = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  async getSingleProduct(id: string) {
    const product = await this.productService.getSingleProduct(id);

    this.name.setValue(product.data.name);
    this.price.setValue(product.data.price);
    this.description.setValue(product.data.description);
    this.imageBase64 = product.data.image;
    this.loaded = true;
  }

  async handleSave() {
    try {
      const res = await apiCall('PATCH', `/product/${this.productId}`, {
        name: this.name.value,
        price: this.price.value,
        description: this.description.value,
        image: this.imageBase64,
      });
      if (res.status === 200) {
        this.getSingleProduct(this.productId);
        alert('Success');
      }
    } catch (e) {}
  }

  convertFileToBase64(evt: any) {
    var file: any = evt.target.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = this.setBase64.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  setBase64(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageBase64 = btoa(binaryString);
  }
}
