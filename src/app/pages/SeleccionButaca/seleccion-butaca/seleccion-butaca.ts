import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

type SeatStatus = 'free' | 'selected' | 'occupied';

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
}

@Component({
  selector: 'app-seleccion-butaca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-butaca.html',
  styleUrls: ['./seleccion-butaca.css']
})
export class SeleccionButacaComponent {
  rows: string[] = ['E','D','C','B','A'];
  seatsPerRow = 15;

  occupied = new Set<string>([
    '7C','8C','9C','10C','11C','12C','13C','14C','15C',
    '1E','2E','3E','4E','5E','6E'
  ]);

  // 💰 Precio fijo de demostración
  precioButaca = 6000;

  // 🧠 Signals principales
  seats = signal<Seat[]>([]);
  selectedIds = signal<Set<string>>(new Set());
  subtotal = signal(0);
  total = signal(0);
  totalSelected = computed(() => this.selectedIds().size);

  pelicula = 'Película X';
  fecha = 'XX/XX';
  formato = 'XXXXX';

  constructor(private router: Router) {
    const all: Seat[] = [];
    for (const row of this.rows) {
      for (let n = 1; n <= this.seatsPerRow; n++) {
        const id = `${n}${row}`;
        all.push({
          id,
          row,
          number: n,
          status: this.occupied.has(id) ? 'occupied' : 'free'
        });
      }
    }
    this.seats.set(all);
  }

  // 🔹 Devuelve las butacas por fila
  byRow(row: string) {
    return this.seats().filter(s => s.row === row);
  }

  // 🔹 Alterna selección de butacas
  toggle(seat: Seat) {
    const sel = new Set(this.selectedIds());

    if (sel.has(seat.id)) {
      // des-seleccionar
      sel.delete(seat.id);
      this.setStatus(seat.id, 'free');
    } else {
      // seleccionar
      sel.add(seat.id);
      this.setStatus(seat.id, 'selected');
    }

    // actualizar el signal
    this.selectedIds.set(sel);

    // actualizar totales
    this.updateTotals(sel.size);
  }

  // 🔹 Actualiza totales visuales
  updateTotals(count: number) {
    const subtotal = count * this.precioButaca;
    this.subtotal.set(subtotal);
    this.total.set(subtotal);
  }

  // 🔹 Método usado en HTML para mostrar cantidad
  totalSelectedCount() {
    return this.selectedIds().size;
  }

  // 🔹 Actualiza el estado visual de cada butaca
  private setStatus(id: string, status: SeatStatus) {
    this.seats.update(arr => arr.map(s => s.id === id ? { ...s, status } : s));
  }

  trackBySeat(_i: number, s: Seat) { return s.id; }

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

