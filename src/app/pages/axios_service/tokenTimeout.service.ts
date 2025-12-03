import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })

export class TokenTimeoutService {
    private timeoutRef!: ReturnType<typeof setTimeout>;
    private timeoutMs = 15 * 60 * 1000; // 15 minutos, duracion del token
    constructor(private authService: AuthService) { }

    startCountdown() {
        this.clear(); // por si ya estaba corriendo
        this.timeoutRef = setTimeout(() => {
            const confirmed = confirm('Tu sesión está por expirar. ¿Querés renovarla?');
            if (confirmed) {
                this.refreshToken();
            } else {
                this.logout();
            }
        }, this.timeoutMs);
    }

    resetCountdown() {
        this.startCountdown(); // reinicia el contador
    }

    clear() {
        if (this.timeoutRef) {
            clearTimeout(this.timeoutRef);
        }
    }

    async refreshToken() {
        await this.authService.refreshToken();
    }

    private logout() {
        this.authService.logout();
        console.log('Sesión cerrada');
    }
}
