import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

import { environment } from "../../environments/environment";
import { NotificationService } from "../notification/notification.service";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class GraphqlService {

  constructor(private httpClient: HttpClient,
              private notificationService: NotificationService,
              private authService: AuthService,
              private router: Router) {
  }

  get<Response>(query: string) {
    return this.httpClient.post<Response>(environment.api, { query }).pipe(catchError(this.handleError));
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.status === 401) {
      this.handleAuthorizeError();
    } else {
      this.notificationService.addNotification({ type: "error", text: error.message });
    }
    return throwError(() => error);
  };

  private handleAuthorizeError() {
    this.notificationService.addNotification({ type: "error", text: "You have to update Api token" });
    this.authService.removeToken();
    this.router.navigate(["/auth"]);
  }
}
