import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ProductService],
})
export class AddProductComponent implements OnInit {
  constructor(public productsService: ProductService) {}

  newProduct = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl(''),
  });

  fileName: string = '';
  imgBase64: string = '';
  isRequest: boolean = false;

  ngOnInit(): void {}

  handleSubmit() {
    console.log({ ...this.newProduct.value, image: this.imgBase64 });
    this.productsService.createProduct({
      ...this.newProduct.value,
      image: this.imgBase64,
    });
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
    this.imgBase64 = btoa(binaryString);
    console.log(btoa(binaryString));
  }
}
