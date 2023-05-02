import { Injectable } from '@angular/core';
import apiCall from '../../utils/axois';
import { Product } from '../../utils/types';

type Products = {
  count: number;
  data: Product[];
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  products: Products = { count: 0, data: [] };

  async getAllProducts() {
    try {
      const res = await apiCall('GET', '/product/');
      if (res.status === 200) {
        this.products = res.data;
      }
    } catch (e) {}
  }

  async deleteProduct(id: string) {
    try {
      const res = await apiCall('DELETE', `/product/${id}`);
      if (res.status === 200) {
        location.reload();
        alert('Success');
      }
    } catch (e) {}
  }

  async getSingleProduct(id: string) {
    try {
      const res = await apiCall('GET', `/product/${id}`);
      if (res.status === 200) {
        return res.data;
      }
    } catch (e) {}
  }
}
