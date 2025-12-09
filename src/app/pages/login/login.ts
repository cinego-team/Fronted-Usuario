import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../axios_service/auth.service';
import { TokenTimeoutService } from '../axios_service/tokenTimeout.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const grecaptcha: any;

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
    captchaToken: string | null = null;
    mostrarPassword = false;

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

    ngOnInit() {
        (window as any).onCaptchaSuccess = (token: string) => {
            const event = new CustomEvent("captcha-success", { detail: token });
            window.dispatchEvent(event);
        };

        window.addEventListener("captcha-success", (e: any) => {
            this.captchaToken = e.detail;
        });
    }

    OnLogin() {
        if (this.formulario.invalid) {
            alert('Por favor, completa todos los campos correctamente.');
            this.formulario.markAllAsTouched();
            return;
        }
        if (!this.captchaToken) {
            alert("Por favor completa el captcha");
            return;
        }
        this.authService
            .login({
                email: this.formulario.value.email,
                password: this.formulario.value.password
            }, this.captchaToken)
            .then(() => {
                this.tokenTimeoutService.startCountdown();
                this.router.navigate(['/cartelera']);
            })
            .catch((error) => {
                alert('Login fallido. Verifica tus credenciales.');
                (window as any).grecaptcha.reset();
                this.captchaToken = null;
            });
    }
}
