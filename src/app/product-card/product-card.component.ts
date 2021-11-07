import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../models/product";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input("product") product: Product;
  @Input("show-actions") showAction = true;

  constructor(private cartService: ShoppingCartService) {}

  addToCart(product: Product) {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      this.cartService.create().then((cart) => {
        console.log(cart);
        localStorage.setItem("cartId", cart.key);

        // add product to a cart
      });
    }
  }
}
