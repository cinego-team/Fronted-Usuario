import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../pages/axios_service/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../pages/axios_service/api.service';

interface usuario {
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  nroTelefono: string;
  tipoCliente: {
    denominacion: string;
    descripcion: string;
  };
}
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header implements OnInit {
  userData: usuario | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    try {
      this.userData = await this.apiService.getDatosUsuario();
    } catch (error) {
      console.error(error);
      this.errorMessage = 'No se pudo cargar el usuario';
    }
  }
}
