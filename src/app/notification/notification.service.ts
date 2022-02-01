import { Injectable } from "@angular/core";

type Notification = { type: "error" | "message", text: string };

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  notification: Notification | null = null;

  constructor() {
  }

  addNotification(notification: Notification) {
    this.notification = notification;
    window.setTimeout(() => this.removeNotification(), 5000);
  }

  removeNotification() {
    this.notification = null;
  }
}
