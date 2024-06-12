import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authorized-user',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './authorized-user.component.html',
  styleUrl: './authorized-user.component.scss',
})
export class AuthorizedUserComponent {}
