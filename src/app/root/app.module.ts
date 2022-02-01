import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { RepositoriesComponent } from "../repositories/repositories.component";
import { RepositoriesModule } from "../repositories/repositories.module";
import { AuthComponent } from "../auth/auth.component";
import { AuthGuardGuard } from "../auth/auth-guard.guard";
import { AuthModule } from "../auth/auth.module";
import { AuthInterceptor } from "../interceptors/auth.interceptor";
import { NotificationModule } from "../notification/notification.module";

const Routes: Routes = [
  { path: "auth", component: AuthComponent },
  { path: "repositories", component: RepositoriesComponent, canActivate: [AuthGuardGuard] }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    RepositoriesModule,
    HttpClientModule,
    AuthModule,
    BrowserAnimationsModule,
    NotificationModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
