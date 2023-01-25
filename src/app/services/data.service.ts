import { Product } from "./../models/product.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Security } from "../utils/security.util";

// posso injetar essa clase em outras classes
// 'root' = disponivel para todos os modulos
@Injectable({ providedIn: "root" })

// pode ter multiplos services. Ex: ProductServices, AccountServices
export class DataService {
  public url = "http://localhost:3000/v1";

  constructor(private http: HttpClient) {}

  public composeHeader() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set("Authorization", `bearer ${token}`);
    return headers;
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  authenticate(data) {
    return this.http.post(`${this.url}/accounts/authenticate`, data);
  }

  refreshToken() {
    return this.http.post(`${this.url}/accounts/refresh-token`, null, {
      headers: this.composeHeader(),
    });
  }

  create(data) {
    return this.http.post(`${this.url}/accounts`, data);
  }

  resetPassword(data) {
    return this.http.post(`${this.url}/accounts/reset-password`, data);
  }

  getProfile() {
    return this.http.get(`${this.url}/accounts`, {
      headers: this.composeHeader(),
    });
  }

  updateProfile(data) {
    return this.http.put(`${this.url}/accounts`, data, {
      headers: this.composeHeader(),
    });
  }
}
