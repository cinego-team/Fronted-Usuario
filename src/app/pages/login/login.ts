import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../axios_service/auth.service';
import { TokenTimeoutService } from '../axios_service/tokenTimeout.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  formulario: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenTimeoutService: TokenTimeoutService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  OnLogin() {
    if (this.formulario.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.formulario.markAllAsTouched();
      return;
    }
    this.authService
      .login({ email: this.formulario.value.email, password: this.formulario.value.password })
      .then(() => {
        this.tokenTimeoutService.startCountdown();
        this.router.navigate(['/cartelera']);
      })
      .catch((error) => {
        alert('Login fallido. Verifica tus credenciales.');
      });
  }
}
