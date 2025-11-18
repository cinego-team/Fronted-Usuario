import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { axiosAPIFunciones } from '../../axios_service/axios.client';
import { config } from '../../axios_service/env';

// =======================
//  MODELOS DEL FRONT
// =======================

// Estados de una butaca en la vista
type SeatStatus = 'libre' | 'seleccionada' | 'ocupada';

// Modelo que USA el HTML (no se toca)
export interface Seat {
  id: string;      // ej: "5A"
  row: string;     // letra de fila (A, B, C...)
  number: number;  // número de butaca (1,2,3,...)
  status: SeatStatus;
}

// =======================
//  DTO QUE VIENE DEL BACK
// =======================

export interface ButacaResponse {
  id: number;
  nroButaca: number;
  fila: {
    letraFila: string;
  };
  estadoDisponibilidad: {
    nombre: string;   // ej: "LIBRE", "OCUPADA"
  };
}

@Component({
  selector: 'app-seleccion-butaca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-butaca.html',
  styleUrls: ['./seleccion-butaca.css']
})
export class SeleccionButacaComponent implements OnInit {

  // Filas que se muestran en pantalla.
  // Antes eran fijas ['E','D','C','B','A'], ahora se llenan según lo que venga del back.
  rows: string[] = [];

  seatsPerRow = 0; // opcional

  // Precio fijo por butaca (demo)
  precioButaca = 6000;

  // Signals con el estado de la pantalla
  seats = signal<Seat[]>([]);
  selectedIds = signal<Set<string>>(new Set());
  subtotal = signal(0);
  total = signal(0);
  totalSelected = computed(() => this.selectedIds().size);

  pelicula = 'Película X';
  fecha = 'XX/XX';
  formato = 'XXXXX';

  constructor(
  private router: Router,
  private route: ActivatedRoute
) {}

  // =======================
  //  CARGA INICIAL
  // =======================
 async ngOnInit(): Promise<void> {
  // Tomamos el idFuncion desde la URL
  const idFuncionParam = this.route.snapshot.paramMap.get('idFuncion');

  if (!idFuncionParam) {
    console.error('No se encontró idFuncion en la ruta');
    return;
  }

  const idFuncion = Number(idFuncionParam);

  try {
    // Llamamos al microservicio
    const { data } = await axiosAPIFunciones.get<ButacaResponse[]>(
      config.APIFuncionesUrls.findAllDisponibilidadByFuncionId(idFuncion)
    );

    // Adaptamos los datos al modelo Seat
    this.cargarButacasDesdeBack(data);

  } catch (err) {
    console.error('Error cargando butacas', err);
  }
}


  // =======================
  //  ADAPTACIÓN BACK → FRONT
  // =======================

  private cargarButacasDesdeBack(butacasBack: ButacaResponse[]) {
    // 1) Mapear cada ButacaResponse → Seat
    const seats: Seat[] = butacasBack.map(b => this.mapFromApi(b));
    this.seats.set(seats);

    // 2) Obtener las filas distintas y ordenarlas como antes (E, D, C, B, A)
    const filas = Array.from(new Set(seats.map(s => s.row))).sort(); // A,B,C...
    this.rows = filas.reverse(); // E,D,C,B,A (si tus filas son A,B,C,D,E)

    // 3) Calcular cuántas butacas máximo hay en una fila (por si lo necesitás)
    this.seatsPerRow = Math.max(
      ...this.rows.map(r => seats.filter(s => s.row === r).length)
    );
  }

  private mapFromApi(b: ButacaResponse): Seat {
    const fila = b.fila.letraFila;  // ej: 'A'
    const nro = b.nroButaca;        // ej: 5

    return {
      id: `${nro}${fila}`,          // "5A"
      row: fila,
      number: nro,
      status: this.mapStatus(b.estadoDisponibilidad?.nombre)
    };
  }

  private mapStatus(nombre?: string): SeatStatus {
    const n = (nombre || '').toUpperCase();
    if (n === 'OCUPADA' || n === 'RESERVADA') return 'ocupada';
    return 'libre'; // todo lo demás se considera libre
  }

  // =======================
  //  MÉTODOS QUE USA EL HTML
  // =======================

  byRow(row: string) {
    return this.seats().filter(s => s.row === row);
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
    this.seats.update(arr =>
      arr.map(s => s.id === id ? { ...s, status } : s)
    );
  }

  trackBySeat(_i: number, s: Seat) {
    return s.id;
  }

  cancelar() {
    this.router.navigate(['pelicula/id']);
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
        formato: this.formato
      }
    });
  }
}
