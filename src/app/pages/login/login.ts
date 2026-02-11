import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenTimeoutService } from '../../services/tokenTimeout.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const grecaptcha: any;

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    formulario: FormGroup;
    loading = false;
    captchaToken: string | null = null;
    mostrarPassword = false;
    private captchaId: number | null = null;
    private readonly EXPECTED_ROLE = "CLIENTE" // Para el frontend de clientes


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
            this.captchaToken = token;
        };
    }

    ngAfterViewInit() {
        const interval = setInterval(() => {
            if (typeof grecaptcha !== 'undefined') {
                clearInterval(interval);

                this.captchaId = grecaptcha.render('captcha', {
                    sitekey: '6LcICREsAAAAAKHWBF39boQk9uCQ__y6iFi7mbb2',
                    callback: (token: string) => {
                        this.captchaToken = token;
                    }
                });
            }
        }, 100);
    }

    ngOnDestroy() {
        if (this.captchaId !== null && typeof grecaptcha !== 'undefined') {
            grecaptcha.reset(this.captchaId);
        }
    }

    OnLogin() {
        try {
            if (this.loading) return;

            this.loading = true;
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
                    password: this.formulario.value.password,
                }, this.captchaToken)
                .then(() => {
                    const userRole = this.authService.getUserRole()

                    if (userRole !== this.EXPECTED_ROLE) {
                        // Si el rol no coincide, cerrar sesión inmediatamente
                        this.authService.logout()
                        alert(
                            `Acceso denegado. Este portal es solo para usuarios con rol ${this.EXPECTED_ROLE}. Tu rol es: ${userRole}`,
                        )
                            ; (window as any).grecaptcha.reset()
                        this.captchaToken = null
                        return
                    }

                    // Si el rol es correcto, continuar normalmente
                    this.tokenTimeoutService.startCountdown()
                    this.router.navigate(["/cartelera"])
                })
                .catch((error) => {
                    alert('Login fallido. Verifica tus credenciales.');
                    (window as any).grecaptcha.reset();
                    this.captchaToken = null;
                });
        } finally {
            this.loading = false;
        }

    }
}
