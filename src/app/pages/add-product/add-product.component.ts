import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import apiCall from 'src/app/utils/axois';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ProductService],
})
export class AddProductComponent implements OnInit {
  constructor(public productsService: ProductService, private router: Router) {}

  newProduct = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
  });

  fileName: string = '';
  imgBase64: string = '';
  isRequest: boolean = false;

  ngOnInit(): void {}

  get name(): any {
    return this.newProduct.get('name');
  }

  get price(): any {
    return this.newProduct.get('price');
  }

  get description(): any {
    return this.newProduct.get('description');
  }

  navToHome() {
    this.router.navigate(['/']);
  }

  async handleSubmit() {
    if (
      !this.imgBase64 ||
      !this.newProduct.value.name ||
      !this.newProduct.value.price ||
      !this.newProduct.value.description
    ) {
      alert('Please Provide Required Inputs');
      return;
    }

    try {
      const res = await apiCall('POST', '/product/', {
        ...this.newProduct.value,
        image: this.imgBase64,
      });
      if (res.status === 201) {
        console.log(res);
        this.productsService.getAllProducts();
        alert('Success! Product Created');
        this.navToHome();
      }
    } catch (e: any) {
      alert(e.response.data.msg);
    }
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
  }
}
