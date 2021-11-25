import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "shared/services/product.service";
import { Subscription } from "rxjs";
import { Product } from "shared/models/product";
import { DataTableResource } from "angular-4-data-table/src";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: Number;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.initializeTable(products);
    });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource
      .query({ offset: 0 })
      .then((items) => (this.items = items));
    this.tableResource.count().then((count) => (this.itemCount = count));
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params).then((items) => (this.items = items));
  }

  filter(query: string) {
    const filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
