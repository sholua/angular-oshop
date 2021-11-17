import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";
export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    for (let productId in itemsMap) {
      const item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  getQuantiry(product: Product) {
    const item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    this.items.forEach((item) => {
      sum += item.totalPrice;
    });
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }
}
