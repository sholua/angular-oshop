import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "app/core/components/home/home.component";
import { LoginComponent } from "app/core/components/login/login.component";
import { NavbarComponent } from "app/core/components/navbar/navbar.component";

@NgModule({
  imports: [CommonModule, RouterModule.forChild([])],
  declarations: [NavbarComponent, HomeComponent, LoginComponent],
  exports: [NavbarComponent],
})
export class CoreModule {}
