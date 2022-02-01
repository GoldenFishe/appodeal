import { Component } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent {
  token = new FormControl("", {
    validators: [
      Validators.required,
      Validators.minLength(40),
      Validators.maxLength(40)]
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  saveToken() {
    this.authService.saveToken(this.token.value);
    this.router.navigate(["repositories"]);
  }
}
