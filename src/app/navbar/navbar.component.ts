import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { AppUser } from "../models/app-user";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    // here we should unsubscribe but it doesn't metter: single instance of this component in the app
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe((cart) => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
