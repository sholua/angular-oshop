import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { ShoppingCartService } from "./shopping-cart.service";

@Injectable()
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  getOrders() {
    return this.db.list("/orders");
  }

  getOrdersByUser(userId: string) {
    return this.db.list("/orders", {
      query: {
        orderByChild: "userId",
        equalTo: userId,
      },
    });
  }

  async placeOrder(order) {
    const result = await this.db.list("/orders").push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
}
