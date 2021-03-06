import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  titre = 'Application de gestion des Assignments';
  Login = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
   
  }
}
