import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Header } from '../../shared/header/header';

export interface Pelicula {
    id: number;
    titulo: string;
    director: string;
    duracion: number;
    fechaEstreno: string;
    sinopsis: string;
    urlImagen: string;
    genero: string;
    clasificacion: string;
}

@Component({
    selector: 'app-cartelera',
    standalone: true,
    imports: [CommonModule, Header],
    templateUrl: './cartelera.html',
    styleUrls: ['./cartelera.css'],
})
export class CarteleraComponent implements OnInit {
    peliculas: Pelicula[] = [];

    constructor(
        private router: Router,
        private readonly apiService: ApiService,
    ) { }

    selectedRow: number | null = null;
    actualPage: number = 1;

    ngOnInit(): void {
        this.initialization();
    }

    async initialization(): Promise<void> {
        const peliculasBack = await this.apiService.getAllPeliculas();
        if (peliculasBack.length === 0) {
            alert('No hay peliculas para mostrar.');
            return;
        }
        this.peliculas = peliculasBack;
    }

    seleccionarPelicula(pelicula: Pelicula): void {
        this.router.navigate(['/pelicula', pelicula.id], {
            state: { pelicula: pelicula },
        });
    }
}
