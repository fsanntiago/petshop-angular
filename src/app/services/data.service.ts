import { Product } from "./../models/product.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// posso injetar essa clase em outras classes
// 'root' = disponivel para todos os modulos
@Injectable({ providedIn: "root" })
export class DataService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>("http://localhost:3000/v1/products");
  }
}
