import { Component } from "@angular/core";
import { CategoryService } from "../../category.service";
import { ProductService } from "../../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/take";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent {
  categories$;
  product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();

    const id = this.route.snapshot.paramMap.get("id");
    if (id)
      this.product = this.productService
        .get(id)
        .take(1)
        .subscribe((p) => (this.product = p));
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }
}
