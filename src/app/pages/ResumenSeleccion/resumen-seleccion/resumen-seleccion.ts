import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ResumenState {
  asientos?: string[];
  pelicula?: string;
  fecha?: string;
  formato?: string;
}

@Component({
  selector: 'app-resumen-seleccion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-seleccion.html',
  styleUrls: ['./resumen-seleccion.css']
})
export class ResumenSeleccionComponent {
  asientos: string[] = [];
  pelicula = 'Película X';
  fecha = 'XX/XX';
  formato = 'XXXXX';

  constructor(private router: Router) {
    const navState = (this.router.getCurrentNavigation()?.extras.state as ResumenState) ?? (history.state as ResumenState);

    this.asientos = navState?.asientos ?? [];
    this.pelicula = navState?.pelicula ?? this.pelicula;
    this.fecha = navState?.fecha ?? this.fecha;
    this.formato = navState?.formato ?? this.formato;

    
  }

  cancelar() {
    this.router.navigate(['/seleccion-butaca']);
  }

  pagar() {
    // Integrar pago aquí
    alert(`Pagando ${this.pelicula} - Asientos: ${this.asientos.join(', ')}`);
  }

  volver(): void {
    this.router.navigate(['/cartelera']);
  }
}
