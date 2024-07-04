import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from '../../shared/services/notification.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-authorized-user',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './authorized-user.component.html',
  styleUrl: './authorized-user.component.scss',
})
export class AuthorizedUserComponent implements OnInit {
  private _notificationService = inject(NotificationService);

  public async ngOnInit() {
    const notifications = await firstValueFrom(this._notificationService.getNotifications());

    this._notificationService.notificationsAmount.next(notifications);
  }
}
