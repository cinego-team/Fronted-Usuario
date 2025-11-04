import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Horario {
  hora: string;
  disponible: boolean;
}

interface Funcion {
  id: number;
  dia: string;
  fecha: string;
  formato: string;
  idioma: string;
  horarios: Horario[];
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
      dia: 'LUNES',
      fecha: '23/09',
      formato: '2D',
      idioma: 'Castellano',
      horarios: [
        { hora: '14:00', disponible: true },
        { hora: '17:30', disponible: true },
        { hora: '20:00', disponible: true },
        { hora: '22:30', disponible: true },
      ],
    },
    {
      id: 2,
      dia: 'LUNES',
      fecha: '23/09',
      formato: '2D',
      idioma: 'Subtitulado',
      horarios: [
        { hora: '15:00', disponible: true },
        { hora: '18:00', disponible: true },
        { hora: '21:00', disponible: false },
      ],
    },
    {
      id: 3,
      dia: 'LUNES',
      fecha: '23/09',
      formato: '3D',
      idioma: 'Castellano',
      horarios: [
        { hora: '16:00', disponible: true },
        { hora: '19:00', disponible: true },
        { hora: '22:00', disponible: true },
      ],
    },
    {
      id: 4,
      dia: 'MARTES',
      fecha: '24/09',
      formato: '2D',
      idioma: 'Castellano',
      horarios: [
        { hora: '14:00', disponible: true },
        { hora: '17:00', disponible: true },
        { hora: '20:00', disponible: true },
      ],
    },
    {
      id: 5,
      dia: 'MARTES',
      fecha: '24/09',
      formato: '3D',
      idioma: 'Subtitulado',
      horarios: [
        { hora: '15:30', disponible: true },
        { hora: '18:30', disponible: true },
        { hora: '21:30', disponible: true },
      ],
    },
  ];

  funcionSeleccionada: Funcion | null = null;
  horarioSeleccionado: string | null = null;
  mostrarModal = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

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

    // Pasar todos los datos a la siguiente pantalla
    this.router.navigate(['/seleccion-butaca'], {
      state: {
        pelicula: this.pelicula.titulo,
        fecha: `${this.funcionSeleccionada!.dia} ${this.funcionSeleccionada!.fecha}`,
        hora: this.horarioSeleccionado,
        formato: this.funcionSeleccionada!.formato,
        idioma: this.funcionSeleccionada!.idioma,
        funcionId: this.funcionSeleccionada!.id,
      },
    });
  }

  volver(): void {
    this.router.navigate(['/cartelera']);
  }
}
