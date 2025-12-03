import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../axios_service/api.service';
import { GlobalStatusService } from '../axios_service/global-status.service';

interface Horario {
  hora: string;
  disponible: boolean;
}

interface Funcion {
  id: number;
  estaDisponible: boolean;
  fecha: Date;
  horarios: Horario[];
  idioma: string;
  sala: {
      nroSala: number;
      capacidad: number;
      estaDisponible: boolean;
  }
  formato: {
      nombre: string;
      precio: number;
  }
  disponibilidadButaca: {
      nroButaca: number
      estadoDisponibilidadButaca: string ;
  }[];
  peliculaId: number; 
}

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
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pelicula.html',
  styleUrls: ['./pelicula.css'],
})

export class PeliculaComponent implements OnInit {
  pelicula: Pelicula = {
    id: 1,
    titulo: 'El Padrino',
    director: 'Francis Ford Coppola',
    duracion: 175,
    sinopsis: 'La historia de la familia Corleone',
    poster:
      'https://i5.walmartimages.com/seo/The-Godfather-Movie-Poster-VIto-Corleone-Red-Rose-Size-24-X-36_b9951cd0-7a18-4591-b01f-aeb91c810965.5533a48d9e52b1344767b4c521ddd607.jpeg',
    estado: 'En cartelera',
    clasificacion: 'R',
    genero: 'Drama',
  };

  funciones: Funcion[] = [
  {
    id: 1,
    estaDisponible: true,
    fecha: new Date('2025-09-23'),
    horarios: [
      { hora: '14:00', disponible: true },
      { hora: '17:30', disponible: true },
      { hora: '20:00', disponible: true },
      { hora: '22:30', disponible: true },
    ],
    idioma: 'Castellano',
    sala: {
      nroSala: 1,
      capacidad: 120,
      estaDisponible: true,
    },
    formato: {
      nombre: '2D',
      precio: 2500,
    },
    disponibilidadButaca: Array.from({ length: 10 }, (_, i) => ({
      nroButaca: i + 1,
      estadoDisponibilidadButaca: i < 2 ? 'Ocupada' : 'Libre',
    })),
    peliculaId: 1,
  },
  {
    id: 2,
    estaDisponible: true,
    fecha: new Date('2025-09-23'),
    horarios: [
      { hora: '15:00', disponible: true },
      { hora: '18:00', disponible: true },
      { hora: '21:00', disponible: false },
    ],
    idioma: 'Subtitulado',
    sala: {
      nroSala: 1,
      capacidad: 120,
      estaDisponible: true,
    },
    formato: {
      nombre: '2D',
      precio: 2600,
    },
    disponibilidadButaca: Array.from({ length: 10 }, (_, i) => ({
      nroButaca: i + 1,
      estadoDisponibilidadButaca: i % 3 === 0 ? 'Ocupada' : 'Libre',
    })),
    peliculaId: 1,
  },
  {
    id: 3,
    estaDisponible: false,
    fecha: new Date('2025-09-23'),
    horarios: [
      { hora: '16:00', disponible: true },
      { hora: '19:00', disponible: true },
      { hora: '22:00', disponible: true },
    ],
    idioma: 'Castellano',
    sala: {
      nroSala: 2,
      capacidad: 150,
      estaDisponible: false,
    },
    formato: {
      nombre: '3D',
      precio: 3000,
    },
    disponibilidadButaca: Array.from({ length: 10 }, (_, i) => ({
      nroButaca: i + 1,
      estadoDisponibilidadButaca: 'Ocupada',
    })),
    peliculaId: 2,
  },
  {
    id: 4,
    estaDisponible: true,
    fecha: new Date('2025-09-24'),
    horarios: [
      { hora: '14:00', disponible: true },
      { hora: '17:00', disponible: true },
      { hora: '20:00', disponible: true },
    ],
    idioma: 'Castellano',
    sala: {
      nroSala: 3,
      capacidad: 100,
      estaDisponible: true,
    },
    formato: {
      nombre: '2D',
      precio: 2500,
    },
    disponibilidadButaca: Array.from({ length: 10 }, (_, i) => ({
      nroButaca: i + 1,
      estadoDisponibilidadButaca: i === 5 ? 'Ocupada' : 'Libre',
    })),
    peliculaId: 3,
  },
  {
    id: 5,
    estaDisponible: true,
    fecha: new Date('2025-09-24'),
    horarios: [
      { hora: '15:30', disponible: true },
      { hora: '18:30', disponible: true },
      { hora: '21:30', disponible: true },
    ],
    idioma: 'Subtitulado',
    sala: {
      nroSala: 4,
      capacidad: 200,
      estaDisponible: true,
    },
    formato: {
      nombre: '3D',
      precio: 3100,
    },
    disponibilidadButaca: Array.from({ length: 10 }, (_, i) => ({
      nroButaca: i + 1,
      estadoDisponibilidadButaca: i % 2 === 0 ? 'Libre' : 'Ocupada',
    })),
    peliculaId: 3,
  },
];

  funcionSeleccionada: Funcion | null = null;
  horarioSeleccionado: string | null = null;
  mostrarModal = false;

  constructor(private route: ActivatedRoute, private router: Router, private readonly apiService: ApiService,
  private readonly globalStatusService: GlobalStatusService) {}

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
    const peliculaId = this.route.snapshot.paramMap.get('id');
    if (peliculaId) {
      console.log('Película ID desde ruta:', peliculaId);
    }
    this.initialization()
  }

async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); //Decorativo
    const data = await this.apiService.getFuncionesByPeliculaId(this.pelicula.id);
    if (data.length === 0) {
      alert('No hay peliculas para mostrar.');
      this.globalStatusService.setLoading(false);
      return;
    }
    this.funciones = data;
    this.globalStatusService.setLoading(false);
  }

  seleccionarHorario(funcion: Funcion, hora: string): void {
    this.funcionSeleccionada = funcion;
    this.horarioSeleccionado = hora;
  }

  continuarCompra(): void {
    if (this.funcionSeleccionada && this.horarioSeleccionado) {
      this.mostrarModal = true;
    } else {
      alert('Por favor selecciona un horario');
    }
  }

  cancelarModal(): void {
    this.mostrarModal = false;
  }

  confirmarCompra(): void {
    this.mostrarModal = false;
    this.router.navigate(['/seleccion-butaca'], {
      state: {
        pelicula: this.pelicula.titulo,
        fecha: this.funcionSeleccionada!.fecha.toLocaleDateString('es-AR'),
        horarios: this.funcionSeleccionada!.horarios,
        formato: this.funcionSeleccionada!.formato.nombre,
        precio: this.funcionSeleccionada!.formato.precio,
        sala: this.funcionSeleccionada!.sala.nroSala,
        capacidadSala: this.funcionSeleccionada!.sala.capacidad,
        estaDisponibleSala: this.funcionSeleccionada!.sala.estaDisponible,
        disponibilidadButaca: this.funcionSeleccionada!.disponibilidadButaca,
        funcionId: this.funcionSeleccionada!.id,
        peliculaId: this.funcionSeleccionada!.peliculaId,
      },
    });
  }

  volver(): void {
    this.router.navigate(['/cartelera']);
  }
}
