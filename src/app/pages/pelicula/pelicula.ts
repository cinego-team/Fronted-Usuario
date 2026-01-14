import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../axios_service/api.service';
import { GlobalStatusService } from '../axios_service/global-status.service';
import { Pelicula } from '../cartelera/cartelera';
import { Header } from '../../shared/header/header';
interface Idioma {
  id: number;
  nombre: string;
}
export interface Funcion {
  id: number;
  estaDisponible: boolean;
  fecha: Date;
  idioma: {
    id: number;
    nombre: string;
  };
  sala: {
    id: number;
    nroSala: number;
  };
  formato: {
    id: number;
    nombre: string;
    precio: number;
  };
}

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './pelicula.html',
  styleUrls: ['./pelicula.css'],
})
export class PeliculaComponent implements OnInit {
  pelicula: Pelicula | null = null;
  funciones: Funcion[] = [];
  funcionSeleccionada: Funcion | null = null;
  mostrarResumen = false;

  constructor(
    private router: Router,
    private readonly apiService: ApiService,
    private readonly globalStatusService: GlobalStatusService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const pelicula = navigation?.extras?.state?.['pelicula'] ?? history.state?.pelicula ?? null;
    this.pelicula = pelicula;
    this.initialization();
  }

  async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    if (!this.pelicula) {
      throw new Error('Ocurrió un error al cargar la película.');
    }
    const funcionesBack = await this.apiService.getFuncionesByPeliculaId(this.pelicula.id);
    if (funcionesBack.length === 0) {
      alert('No hay funciones para mostrar.');
      this.globalStatusService.setLoading(false);
      return;
    }
    this.funciones = funcionesBack;
    this.globalStatusService.setLoading(false);
  }

  seleccionarFuncion(funcion: Funcion): void {
    this.funcionSeleccionada = funcion;
    this.mostrarResumen = true;
  }

  cancelarResumen(): void {
    this.mostrarResumen = false;
    this.funcionSeleccionada = null;
  }

  confirmarCompra(): void {
    if (this.pelicula && this.funcionSeleccionada) {
      this.mostrarResumen = false;
      this.router.navigate(['/seleccion-butaca'], {
        state: {
          funcion: this.funcionSeleccionada,
          pelicula: this.pelicula,
        },
      });
    }
  }

  volver(): void {
    this.router.navigate(['/cartelera']);
  }
}
