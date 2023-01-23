import { Product } from "./../models/product.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// posso injetar essa clase em outras classes
// 'root' = disponivel para todos os modulos
@Injectable({ providedIn: "root" })

// pode ter multiplos services. Ex: ProductServices, AccountServices
export class DataService {
  public url = "http://localhost:3000/v1";

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.url}/product`);
  }

  authenticate(data) {
    return this.http.post(`${this.url}/accounts/authenticate`, data);
  }
}
