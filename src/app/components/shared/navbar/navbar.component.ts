import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { Security } from "../../../utils/security.util";
import { CartUtil } from "src/app/utils/cart.util";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  public user: User;
  constructor(private route: Router) {}

  ngOnInit() {
    this.user = Security.getUser();
  }

  logout() {
    Security.clear();
    this.route.navigate(["/login"]);
  }

  totalCartItems() {
    let total = 0;
    let cart = CartUtil.get();
    cart.items.forEach((item) => {
      total += item.quantity;
    });

    return total;
  }
}
