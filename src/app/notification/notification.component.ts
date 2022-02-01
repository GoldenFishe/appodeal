import { Component } from '@angular/core';

import { NotificationService } from "./notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  constructor(private notificationService: NotificationService) {
  }

  get notification() {
    return this.notificationService.notification;
  }

}
