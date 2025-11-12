import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../axios_service/auth.service';
import { TokenTimeoutService } from '../axios_service/tokenTimeout.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private tokenTimeoutService: TokenTimeoutService) { }

  OnLogin() {
    this.authService.login({ email: this.email, password: this.password }).then(() => {
      this.tokenTimeoutService.startCountdown();
      this.router.navigate(['/cartelera']);
    }).catch(error => {
      alert('Login fallido. Verifica tus credenciales.');
    }
    )
  };
}