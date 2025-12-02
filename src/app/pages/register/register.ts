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
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent {
  formulario: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.pattern(/^\S.*\S$/),Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/),]],
    });
  }

  onRegister() {
    if (this.formulario.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.formulario.markAllAsTouched();
      return;
    }
    const email = this.formulario.value.email;
    const contraseña = this.formulario.value.contraseña;
    console.log('Email:', email);
    console.log('Contraseña:', contraseña);
    this.authService
      .register({ email, password: contraseña })
      .then(() => {
        this.successMessage = 'Registro exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      })
      .catch((err) => {
        if (err.status === 409) {
          this.errorMessage = 'El correo ya está registrado.';
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error inesperado. Intenta más tarde.';
        }
      });
  }
}
