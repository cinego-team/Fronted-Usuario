import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../axios_service/api.service';
import { GlobalStatusService } from '../axios_service/global-status.service';

interface Pelicula {
  id: number;
  titulo: string;
  director: string;
  duracion: number;
  sinopsis: string;
  poster: string;
  estado: string;
  clasificacion: string;
  genero: string;
}

@Component({
  selector: 'app-cartelera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartelera.html',
  styleUrls: ['./cartelera.css'],
})

export class CarteleraComponent implements OnInit {
 
  peliculas: Pelicula[] = [];

  constructor(
    private router: Router,
    private readonly apiService: ApiService,
    private readonly globalStatusService: GlobalStatusService
  ) {}

  selectedRow: number | null = null;
  actualPage: number = 1;

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); //Decorativo
    const data = await this.apiService.getAllPeliculas(this.actualPage);
    if (data.length === 0) {
      alert('No hay peliculas para mostrar.');
      this.globalStatusService.setLoading(false);
      this.actualPage --;
      return;
    }
    this.peliculas = data;
    this.globalStatusService.setLoading(false);
  }

  seleccionarPelicula(pelicula: Pelicula): void {
    // Navegar a la pantalla de funciones pasando el ID de la película
    this.router.navigate(['/pelicula', pelicula.id], {
      state: { pelicula: pelicula },
    });
  }

  OnUsuario() {
    this.router.navigate(['/login']);
  }
  
  volver(): void {
    this.router.navigate(['/cartelera']);
  }
}
