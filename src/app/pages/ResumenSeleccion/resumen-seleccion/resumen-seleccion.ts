import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface ResumenState {
  asientos?: string[];
  pelicula?: string;
  fecha?: string;
  formato?: string;
  precioButaca?: number;
}

@Component({
  selector: 'app-resumen-seleccion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen-seleccion.html',
  styleUrls: ['./resumen-seleccion.css'],
})
export class ResumenSeleccionComponent {
  asientos: string[] = [];
  pelicula = '';
  fecha = '';
  formato = '';
  precioButaca = 0;

  constructor(private router: Router) {
    const navState =
      (this.router.getCurrentNavigation()?.extras.state as ResumenState) ??
      (history.state as ResumenState);

    this.asientos = navState?.asientos ?? [];
    this.pelicula = navState?.pelicula ?? '';
    this.fecha = navState?.fecha ?? '';
    this.formato = navState?.formato ?? '';
    this.precioButaca = navState?.precioButaca ?? 0;
  }

  total(): number {
    return this.asientos.length * this.precioButaca;
  }

  cancelar() {
    this.router.navigate(['/seleccion-butaca']);
  }

  pagar() {
      //Añadir la integracion de mercado pago     alert(
      `Pagando ${this.pelicula} - Asientos: ${this.asientos.join(
        ', '
      )} - Total: $${this.total()}`
    
  }

  volver(): void {
    this.router.navigate(['/cartelera']);
  }
}

