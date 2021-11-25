import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/auth.service";
import { AppUser } from "shared/models/app-user";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { Observable } from "rxjs";
import { ShoppingCart } from "shared/models/shopping-cart";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    // here we should unsubscribe but it doesn't metter: single instance of this component in the app
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
