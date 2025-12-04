import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { axiosAPIFunciones, axiosAPIPeliculas } from '../../axios_service/axios.client';
import { config } from '../../axios_service/env';

//  MODELOS DEL FRONT

type SeatStatus = 'libre' | 'seleccionada' | 'ocupada';

export interface Seat {
  id: string;      // ej: "5A"
  row: string;     // letra de fila (A, B, C... )
  number: number;  // número de butaca (1,2,3,...)
  status: SeatStatus;
}

//  DTOs QUE VIENEN DEL BACK

// Lo que devuelve el endpoint de disponibilidad/butacas por función
export interface ButacaResponse {
  id: number;
  nroButaca: number;
  fila: {
    letraFila: string;
  };
  disponibilidadButaca: {
    estadoDisponibilidadButaca: {
      nombre: string;   // 'DISPONIBLE' | 'OCUPADA' | 'RESERVADA' | ...
    };
  };
}

// Lo que devuelve GET /funciones/:id
export interface FuncionResponse {
  id: number;
  estaDisponible: boolean;
  fecha: string;      // llega como string en JSON
  peliculaId: number;
  sala: { id: number };
  formato: {
    id: number;
    nombre: string;
  };
  precioEntrada?: number; // si existiera en tu back, lo aprovechamos
}

// Lo que devuelve GET /pelicula/:id
export interface PeliculaResponse {
  id: number;
  titulo: string;
}

@Component({
  selector: 'app-seleccion-butaca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-butaca.html',
  styleUrls: ['./seleccion-butaca.css'],
})
export class SeleccionButacaComponent implements OnInit {
  // Filas que se muestran en pantalla (se llenan desde el back)
  rows: string[] = [];

  seatsPerRow = 0; // opcional

  // Precio por butaca (lo intentamos traer del back)
  precioButaca = 0;

  // Signals con el estado de la pantalla
  seats = signal<Seat[]>([]);
  selectedIds = signal<Set<string>>(new Set());
  subtotal = signal(0);
  total = signal(0);
  totalSelected = computed(() => this.selectedIds().size);

  // Datos que mostramos y luego pasamos al resumen
  pelicula = '';
  fecha = '';
  formato = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  //  CARGA INICIAL
  async ngOnInit(): Promise<void> {
    const idFuncionParam = this.route.snapshot.paramMap.get('idFuncion');

    if (!idFuncionParam) {
      console.error('No se encontró idFuncion en la ruta');
      return;
    }

    const idFuncion = Number(idFuncionParam);

    try {
      // 1) Traer datos de la FUNCIÓN (fecha, formato, peliculaId, precio)
      const funcionResp = await axiosAPIFunciones.get<FuncionResponse>(
        config.APIFuncionesUrls.getFuncionById(idFuncion)
      );
      const funcion = funcionResp.data;

      // FECHA real desde el back
      this.fecha = new Date(funcion.fecha).toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      // FORMATO real
      this.formato = funcion.formato?.nombre ?? '';

      // PRECIO por butaca, si tu función lo tiene
      if (funcion.precioEntrada != null) {
        this.precioButaca = funcion.precioEntrada;
      }

      // 2) Traer datos de la PELÍCULA (título) usando peliculaId
      const peliculaResp = await axiosAPIPeliculas.get<PeliculaResponse>(
        config.APIPeliculasUrls.getPeliculaById(funcion.peliculaId)
      );
      const pelicula = peliculaResp.data;
      this.pelicula = pelicula.titulo;

      // 3) Traer disponibilidad de BUTACAS para esa función
      const { data } = await axiosAPIFunciones.get<ButacaResponse[]>(
        config.APIFuncionesUrls.findAllDisponibilidadByFuncionId(idFuncion)
      );

      this.cargarButacasDesdeBack(data);
    } catch (err) {
      console.error('Error cargando datos de función/película/butacas', err);
    }
  }

  //  ADAPTACIÓN BACK → FRONT

  private cargarButacasDesdeBack(butacasBack: ButacaResponse[]) {
    const seats: Seat[] = butacasBack.map((b) => this.mapFromApi(b));
    this.seats.set(seats);

    const filas = Array.from(new Set(seats.map((s) => s.row))).sort(); // A,B,C...
    this.rows = filas.reverse(); // E,D,C,B,A si tus filas son A..E

    this.seatsPerRow = Math.max(
      ...this.rows.map((r) => seats.filter((s) => s.row === r).length)
    );
  }

  private mapFromApi(b: ButacaResponse): Seat {
    const fila = b.fila.letraFila;
    const nro = b.nroButaca;
    const estadoNombre =
      b.disponibilidadButaca?.estadoDisponibilidadButaca?.nombre;

    return {
      id: `${nro}${fila}`,
      row: fila,
      number: nro,
      status: this.mapStatus(estadoNombre),
    };
  }

  private mapStatus(nombre?: string): SeatStatus {
    const n = (nombre || '').toUpperCase();
    if (n === 'OCUPADA' || n === 'RESERVADA') return 'ocupada';
    // DISPONIBLE, FUERA_DE_SERVICIO, etc. podés afinarlos si querés
    return 'libre';
  }

  //  MÉTODOS PARA EL HTML

  byRow(row: string) {
    return this.seats().filter((s) => s.row === row);
  }

  toggle(seat: Seat) {
    const sel = new Set(this.selectedIds());

    if (sel.has(seat.id)) {
      sel.delete(seat.id);
      this.setStatus(seat.id, 'libre');
    } else {
      sel.add(seat.id);
      this.setStatus(seat.id, 'seleccionada');
    }

    this.selectedIds.set(sel);
    this.updateTotals(sel.size);
  }

  updateTotals(count: number) {
    const subtotal = count * this.precioButaca;
    this.subtotal.set(subtotal);
    this.total.set(subtotal);
  }

  totalSelectedCount() {
    return this.selectedIds().size;
  }

  private setStatus(id: string, status: SeatStatus) {
    this.seats.update((arr) =>
      arr.map((s) => (s.id === id ? { ...s, status } : s))
    );
  }

  trackBySeat(_i: number, s: Seat) {
    return s.id;
  }

  cancelar() {
    this.router.navigate(['/cartelera']);
  }

  volver(): void {
    this.router.navigate(['/cartelera']);
  }

  continuar() {
    const seleccion = Array.from(this.selectedIds());
    if (!seleccion.length) return;

    this.router.navigate(['/resumen-seleccion'], {
      state: {
        asientos: seleccion,
        pelicula: this.pelicula,
        fecha: this.fecha,
        formato: this.formato,
        precioButaca: this.precioButaca,
      },
    });
  }
}


