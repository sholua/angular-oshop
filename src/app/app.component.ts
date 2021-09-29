import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    auth.user$.subscribe((user) => {
      const returnUrl = localStorage.getItem("returnUrl");

      if (user) {
        userService.save(user);
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
