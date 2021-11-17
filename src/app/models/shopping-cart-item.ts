import { Product } from "./product";
export class ShoppingCartItem {
  $key: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;

  // constructor(public product: Product, public quantity: number) {}

  get totalPrice() {
    return this.price * this.quantity;
  }
}
