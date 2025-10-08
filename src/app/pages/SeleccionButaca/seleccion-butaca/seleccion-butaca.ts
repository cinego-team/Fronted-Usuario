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

  seats = signal<Seat[]>([]);
  selectedIds = signal<Set<string>>(new Set());
  totalSelected = computed(() => this.selectedIds().size);

  pelicula = 'Película X';
  fecha = 'XX/XX';
  formato = 'XXXXX';

  constructor(private router: Router) {
    const all: Seat[] = [];
    for (const row of this.rows) {
      for (let n = 1; n <= this.seatsPerRow; n++) {
        const id = `${n}${row}`;
        all.push({ id, row, number: n, status: this.occupied.has(id) ? 'occupied' : 'free' });
      }
    }
    this.seats.set(all);
  }

  byRow(row: string) {
    return this.seats().filter(s => s.row === row);
  }

  toggle(seat: Seat) {
  if (seat.status === 'occupied') return;

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

  this.selectedIds.set(sel);
}


  private setStatus(id: string, status: SeatStatus) {
    this.seats.update(arr => arr.map(s => s.id === id ? { ...s, status } : s));
  }

  trackBySeat(_i: number, s: Seat) { return s.id; }

  cancelar() {
    this.selectedIds.set(new Set());
    this.seats.update(arr => arr.map(s => this.occupied.has(s.id) ? s : { ...s, status: 'free' }));
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
