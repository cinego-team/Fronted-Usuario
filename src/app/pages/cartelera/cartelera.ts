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
 
  peliculas: Pelicula[] = [
    {
      id: 1,
      titulo: 'Avengers: Endgame',
      director: 'Russo Brothers',
      duracion: 181,
      sinopsis:
        'Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos. En esta entrega final, cada héroe debe enfrentarse a sus pérdidas personales, tomar decisiones difíciles y unirse en una misión que trasciende el tiempo y el espacio. El destino de todo el universo depende de su capacidad para trabajar juntos, superar sus diferencias y hacer el máximo sacrificio si es necesario. La batalla culminante contra Thanos se convierte en un evento que define generaciones, lleno de emoción, acción y momentos que marcan el corazón de los fanáticos.',
      poster: 'https://http2.mlstatic.com/D_NQ_NP_614424-MLA52735656162_122022-O.webp',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Acción',
    },
    {
      id: 2,
      titulo: 'El Padrino',
      director: 'Francis Ford Coppola',
      duracion: 175,
      sinopsis:
        'El patriarca envejecido de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su hijo reacio. A través de traiciones, guerras de poder y difíciles elecciones familiares, la historia muestra cómo la lealtad, el honor y la violencia se entrelazan en el mundo de la mafia. La transformación del joven Michael Corleone, quien inicialmente rechaza la vida criminal, se convierte en el eje de una narrativa que expone la ambición, el sacrificio y la brutalidad que conlleva mantener un imperio de poder y respeto en un entorno despiadado.',
      poster:
        'https://i5.walmartimages.com/seo/The-Godfather-Movie-Poster-VIto-Corleone-Red-Rose-Size-24-X-36_b9951cd0-7a18-4591-b01f-aeb91c810965.5533a48d9e52b1344767b4c521ddd607.jpeg',
      estado: 'En cartelera',
      clasificacion: 'R',
      genero: 'Drama',
    },
    {
      id: 3,
      titulo: 'Inception',
      director: 'Christopher Nolan',
      duracion: 148,
      sinopsis:
        'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños se embarca en la misión más arriesgada de su vida. Dom Cobb y su equipo deben implantar una idea en la mente de un objetivo, una tarea conocida como "origen". A medida que viajan por múltiples niveles de sueños, enfrentan proyecciones hostiles, giros psicológicos y la lucha interna de Cobb con los recuerdos de su difunta esposa. La película explora los límites de la realidad y la ilusión, cuestionando qué es verdadero y qué es una construcción de la mente.',
      poster: 'https://http2.mlstatic.com/D_NQ_NP_860530-MLA81194764967_122024-O.webp',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Ciencia Ficción',
    },
    {
      id: 4,
      titulo: 'Titanic',
      director: 'James Cameron',
      duracion: 194,
      sinopsis:
        'Una joven aristócrata conoce a un artista humilde en el Titanic, y juntos viven un romance breve e intenso que se ve interrumpido por la tragedia del hundimiento. La historia combina amor, desigualdad social y la catástrofe marítima más famosa de la historia moderna.',
      poster: 'https://http2.mlstatic.com/D_NQ_NP_641784-MLA72402615737_102023-O.webp',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Romance',
    },
    {
      id: 5,
      titulo: 'Jurassic Park',
      director: 'Steven Spielberg',
      duracion: 127,
      sinopsis:
        'Un parque temático que alberga dinosaurios clonados sufre un fallo de seguridad y los visitantes quedan atrapados en una pesadilla de supervivencia. La combinación de ambición científica desmedida y el poder de la naturaleza pone a prueba la capacidad humana de controlar lo incontrolable.',
      poster: 'https://m.media-amazon.com/images/I/61iF3RSsLsL._UF894,1000_QL80_.jpg',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Aventura',
    },
    {
      id: 6,
      titulo: 'Matrix',
      director: 'Wachowski',
      duracion: 136,
      sinopsis:
        'Un hacker descubre que la realidad que conoce es una simulación creada por máquinas. Al unirse a la resistencia, debe aprender a liberar su mente y aceptar su papel como el elegido que puede cambiar el destino de la humanidad.',
      poster: 'https://m.media-amazon.com/images/I/51ISve-1n1S._UF894,1000_QL80_.jpg',
      estado: 'En cartelera',
      clasificacion: 'R',
      genero: 'Ciencia Ficción',
    },
    {
      id: 7,
      titulo: 'Forrest Gump',
      director: 'Robert Zemeckis',
      duracion: 142,
      sinopsis:
        'Un hombre con un gran corazón y una perspectiva inocente vive acontecimientos clave de la historia de Estados Unidos, influyendo en ellos de formas inesperadas. Su vida, marcada por el amor, la amistad y la perseverancia, demuestra que cualquiera puede dejar huella en el mundo.',
      poster: 'https://postercity.com.ar/wp-content/uploads/2021/07/Forrest-Gump.jpg',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Drama',
    },
    {
      id: 8,
      titulo: 'Interestelar',
      director: 'Christopher Nolan',
      duracion: 169,
      sinopsis:
        'Un equipo de exploradores viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad. Con el planeta Tierra en decadencia, los astronautas enfrentan desafíos científicos y emocionales en una misión que combina sacrificio, amor y esperanza. La película examina la relatividad del tiempo, la fuerza de los lazos familiares y la lucha desesperada por la supervivencia de la especie humana, presentando un viaje épico a los confines del universo y a los límites del espíritu humano.',
      poster: 'https://m.media-amazon.com/images/I/61ASebTsLpL._UF894,1000_QL80_.jpg',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Ciencia Ficción',
    },
  ];

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
