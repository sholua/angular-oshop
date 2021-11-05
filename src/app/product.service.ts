import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  getAll() {
    return this.db.list("/products");
  }

  create(product) {
    return this.db.list("/products").push(product);
  }

  get(productId) {
    return this.db.object("/products/" + productId);
  }
}
