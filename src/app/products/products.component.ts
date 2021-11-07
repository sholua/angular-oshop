import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "../product.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../models/product";
import "rxjs/add/operator/switchMap";
import { ShoppingCartService } from "../shopping-cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: "products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  subscription: Subscription;
  cart: any;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppintCartService: ShoppingCartService
  ) {
    productService
      .getAll()
      .switchMap((products) => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe((params) => {
        this.category = params.get("category");

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppintCartService.getCart()).subscribe(
      (cart) => (this.cart = cart)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
