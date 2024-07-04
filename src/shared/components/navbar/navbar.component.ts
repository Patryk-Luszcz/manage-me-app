import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatBadgeModule } from '@angular/material/badge';
import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsModalComponent } from '../modals/notifications-modal/notifications-modal.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, MatBadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authorizationToken!: boolean;
  userLogin!: any;

  notifications!: any[];

  private _cookieService = inject(CookieService);
  private _notificationService = inject(NotificationService);
  private _modal = inject(MatDialog);

  public ngOnInit() {
    this.authorizationToken = this._cookieService.get('AuthorizationToken') ? true : false;
    this.userLogin = JSON.parse(window.localStorage.getItem('UserInfo') || '{}');

    this._notificationService.notificationsAmount.subscribe((amount) => {
      if (!Array.isArray(amount)) {
        this.notifications.push(amount);
      } else {
        this.notifications = amount;
      }
    });
  }

  public signOut() {
    window.localStorage.removeItem('UserInfo');
    this._cookieService.delete('AuthorizationToken');

    setTimeout(() => {
      document.location.reload();
    }, 0);

    this.ngOnInit();
  }

  public openNotificationModal() {
    if (this.notifications.length === 0) return;

    const modalData = {
      minWidth: '60vw',
      data: {
        notifications: this.notifications,
        title: 'Notifications',
      },
    };

    const modalRef = this._modal.open(NotificationsModalComponent, modalData);

    modalRef
      .afterClosed()
      .pipe(switchMap(() => this._notificationService.clearNotifications()))
      .subscribe((response) => {
        this.notifications = response;
        this._notificationService.notificationsAmount.next(response);
      });
  }
}
