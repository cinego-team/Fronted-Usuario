import { Component } from '@angular/core';
import { AuthService } from '../axios_service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface RegisterResponse {
  message?: string;
  access_token?: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  password: any;
  email: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  onRegister() {
    const email = this.email;
    const password = this.password;
    console.log('Email:', email);
    console.log('Password:', password);
    this.authService.register({ email, password }).then(() => {
      this.successMessage = 'Registro exitoso. Redirigiendo...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    }).catch(err => {
      if (err.status === 409) {
        this.errorMessage = 'El correo ya está registrado.';
      } else if (err.error && err.error.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = 'Error inesperado. Intenta más tarde.';
      }
    }
    )
  };
}

