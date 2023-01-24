import { Security } from "../utils/security.util";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()

// Pode crair varios desses canActivate
export class AuthService implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const hasToken = Security.hasToken();

    if (!hasToken) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
