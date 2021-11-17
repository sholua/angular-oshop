import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart";
import { Subscription } from "rxjs";
import { OrderService } from "../order.service";
import { AuthService } from "../auth.service";
import { Order } from "../models/order";
import { Router } from "@angular/router";

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.css"],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping: {} = {};
  cart: ShoppingCart;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private shopppingCartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    const cart$ = await this.shopppingCartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));
    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.storeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }
}
