import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  newProduct = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
  });

  handleSubmit() {
    console.log(this.newProduct.value);
  }

  convertFileToBase64(event: any) {
    var file = event.target.files[0];
    console.log(file);

    var reader = new FileReader();
    reader.onloadend = function () {
      console.log('RESULT', reader.result);
    };
    reader.readAsDataURL(file);
  }
}
