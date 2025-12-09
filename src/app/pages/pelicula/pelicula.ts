import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../axios_service/api.service';
import { GlobalStatusService } from '../axios_service/global-status.service';

interface Funcion {
    id: number;
    estaDisponible: boolean;
    fecha: Date;
    idioma: string;
    sala: {
        id: number;
        nroSala: number;
    }
    formato: {
        id: number;
        nombre: string;
        precio: number;
    }
}

interface Pelicula {
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
    selector: 'app-pelicula',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pelicula.html',
    styleUrls: ['./pelicula.css'],
})

export class PeliculaComponent implements OnInit {
    pelicula: Pelicula | null = null;
    funciones: Funcion[] = [];
    funcionSeleccionada: Funcion | null = null;
    mostrarModal = false;

    constructor(private route: ActivatedRoute, private router: Router, private readonly apiService: ApiService,
        private readonly globalStatusService: GlobalStatusService) { }

    ngOnInit(): void {
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras?.state) {
            const peliculaData = navigation.extras.state['pelicula'];
            if (peliculaData) {
                this.pelicula = peliculaData;
            }
        }
        if (window.history.state && window.history.state.pelicula) {
            this.pelicula = window.history.state.pelicula;
        }
        this.initialization()
    }

    async initialization(): Promise<void> {
        this.globalStatusService.setLoading(true);
        if (!this.pelicula) {
            throw new Error('Ocurrió un error al cargar la película.');
        }
        const data = await this.apiService.getFuncionesByPeliculaId(this.pelicula.id);
        if (data.length === 0) {
            alert('No hay peliculas para mostrar.');
            this.globalStatusService.setLoading(false);
            return;
        }
        this.funciones = data;
        this.globalStatusService.setLoading(false);
    }

    seleccionarFuncion(funcion: Funcion): void {
        this.funcionSeleccionada = funcion;
    }

    continuarCompra(): void {
        if (this.funcionSeleccionada) {
            this.mostrarModal = true;
        } else {
            alert('Por favor selecciona un horario');
        }
    }

    cancelarModal(): void {
        this.mostrarModal = false;
    }

    confirmarCompra(): void {
        if (this.pelicula && this.funcionSeleccionada) {
            this.mostrarModal = false;
            this.router.navigate(['/seleccion-butaca'], {
                state: {
                    funcionId: this.funcionSeleccionada.id
                },
            });
        }
    }

    OnUsuario() {
        this.router.navigate(['/mi-usuario']);
    }

    volver(): void {
        this.router.navigate(['/cartelera']);
    }
}
