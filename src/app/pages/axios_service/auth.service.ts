import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { axiosAPIUsuarios, axiosAuthService } from './axios.client';
import { config } from './env';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private router: Router) { }

    private hasToken(): boolean {
        return !!localStorage.getItem('access_token');
    }

    getIsLoggedInObservable(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    checkTokenValidity(): boolean {
        return !!this.getToken();
    }

    decodeToken(token: string): any {
        try {
            const base64Url = token.split(".")[1]
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                    .join(""),
            )
            return JSON.parse(jsonPayload)
        } catch (error) {
            console.error("Error decodificando token:", error)
            return null
        }
    }

    getUserRole(): string | null {
        const token = this.getToken()
        if (!token) return null

        const decoded = this.decodeToken(token)
        // El rol puede estar en diferentes propiedades según cómo se generó el token
        return decoded?.role?.name || decoded?.role || decoded?.userRole || null
    }

    async login(credentials: { email: string; password: string; }, captcha: string): Promise<any> {
        const respuesta = (
            await axiosAuthService.post(config.APIUsuariosUrls.login, credentials, { headers: { "x-captcha-token": captcha || "" } })
        ).data;
        const token = respuesta.accessToken;
        const refreshToken = respuesta.refreshToken;
        if (token) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('refresh_token', refreshToken);
            this.loggedIn.next(true);
        }
        return respuesta;
    }

    async register(credentials: {
        nombre: string;
        apellido: string;
        email: string;
        contrasena: string;
        dd: number;
        mm: number;
        aaaa: number;
        nroTelefono: string;
    },
        captcha: string
    ): Promise<any> {
        const respuesta = (
            await axiosAuthService.post(config.APIUsuariosUrls.register, credentials, { headers: { "x-captcha-token": captcha || "" } })
        ).data;
        const token = respuesta.access_token;
        const refreshToken = respuesta.refresh_token;
        if (token) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('refresh_token', refreshToken);
            this.loggedIn.next(true);
        }
        return respuesta;
    }

    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    async refreshToken(): Promise<void> {
        const response = await axiosAuthService.get(config.APIUsuariosUrls.refreshToken);

        const { accessToken, refreshToken } = response.data;

        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
        }

        if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
        }
    }

    async getDatosUsuario(): Promise<{
        nombre: string;
        apellido: string;
        email: string;
        fechaNacimiento: string;
        nroTelefono: string;
        tipoCliente: {
            denominacion: string;
            descripcion: string;
        };
    }> {
        const datos = (await axiosAPIUsuarios.get(config.APIUsuariosUrls.getDatosUsuario)).data;
        return {
            nombre: datos.nombre,
            apellido: datos.apellido,
            email: datos.email,
            fechaNacimiento: datos.fechaNacimiento,
            nroTelefono: datos.nroTelefono,
            tipoCliente: {
                denominacion: datos.tipoCliente.denominacion,
                descripcion: datos.tipoCliente.descripcion,
            },
        };
    }
}
