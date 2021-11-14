import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../models/product";
import { ShoppingCartService } from "../shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input("product") product: Product;
  @Input("show-actions") showAction = true;
  @Input("shopping-cart") shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantiry() {
    if (!this.shoppingCart || !this.shoppingCart.items) return 0;

    const item = this.shoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
  }
}
