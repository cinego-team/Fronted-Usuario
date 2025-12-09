import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../axios_service/auth.service';
import { TokenTimeoutService } from '../axios_service/tokenTimeout.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalStatusService } from '../axios_service/global-status.service';
import { ApiService } from '../axios_service/api.service';

interface Usuario {
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
    nroTelefono: string;
    tipoCliente: {
        denominacion: string;
        descripcion: number;
    }
}

@Component({
    selector: 'app-mi-usuario',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './mi-usuario.html',
    styleUrl: './mi-usuario.css',
})
export class MiUsuarioComponent {
    userData: Usuario | null = null;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    constructor(
        private authService: AuthService,
        private router: Router,
        private readonly apiService: ApiService,
        private readonly globalStatusService: GlobalStatusService
    ) { }

    ngOnInit(): void {
        this.initialization();
    }

    async initialization(): Promise<void> {
        this.globalStatusService.setLoading(true);
        const data = await this.apiService.getDatosUsuario();
        this.userData = data;
        this.globalStatusService.setLoading(false);
    }

    volver(): void {
        this.router.navigate(['/cartelera']);
    }

    logout(): void {
        this.authService.logout();
    }
}
