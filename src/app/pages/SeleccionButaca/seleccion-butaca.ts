import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Pelicula } from '../cartelera/cartelera';
import { Funcion } from '../pelicula/pelicula';
import { AuthService } from '../../services/auth.service';

interface Seat {
  id: string; // "4C"
  disponibilidadButacaId: number; // ID real del backend
  row: string;
  number: number;
  status: string;
}
interface ButacaResponse {
  id: number;
  butaca: {
    nroButaca: number;
    fila: {
      letraFila: string;
    };
  };
  estadoDisponibilidadButaca: {
    nombre: string;
  };
}

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  nroTelefono: string;
  tipoCliente: {
    denominacion: string;
    descripcion: string;
  };
}

export interface Seleccion {
  funcionId: number;
  asientos: string[];
  tituloPelicula: string;
  fecha: string;
  nombreFormato: string;
  precioButaca: number | null;
}

@Component({
  selector: 'app-seleccion-butaca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seleccion-butaca.html',
  styleUrls: ['./seleccion-butaca.css'],
})
export class SeleccionButacaComponent implements OnInit {
  mostrarResumen = false;
  funcion: Funcion | null = null;
  pelicula: Pelicula | null = null;
  rows: string[] = [];
  seatsPerRow = 0;
  seats = signal<Seat[]>([]);
  selectedIds = signal<Set<string>>(new Set());
  subtotal = signal(0);
  descuento = signal(0);
  descuentoMostrar = signal(0);
  total = signal(0);
  totalSelected = computed(() => this.selectedIds().size);
  seleccion: Seleccion = {
    funcionId: 0,
    asientos: [],
    tituloPelicula: '',
    fecha: '',
    nombreFormato: '',
    precioButaca: null,
  };
  userData: Usuario | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  //  CARGA INICIAL
  async ngOnInit(): Promise<void> {
    const navigation = this.router.getCurrentNavigation();
    const funcion = navigation?.extras?.state?.['funcion'] ?? history.state?.funcion ?? null;
    this.funcion = funcion;

    const pelicula = navigation?.extras?.state?.['pelicula'] ?? history.state?.pelicula ?? null;
    this.pelicula = pelicula;

    this.initialization();
  }

  async initialization() {
    try {
      if (this.pelicula && this.funcion) {
        this.seleccion = {
          funcionId: this.funcion.id,
          asientos: [],
          tituloPelicula: this.pelicula.titulo,
          fecha: new Date(this.funcion.fecha).toString(),
          nombreFormato: this.funcion.formato.nombre,
          precioButaca: this.funcion.formato.precio,
        };

        const butacas: ButacaResponse[] = await this.apiService.getDisponibilidadByFuncionId(
          this.funcion.id,
        );
        const data = await this.authService.getDatosUsuario();
        this.userData = data;
        this.cargarButacasDesdeBack(butacas);

        const promocion = await this.apiService.validarPromocionDeUsuario();

        this.descuento.set(promocion.porcentajeDescuento);
      } else {
        alert('Ocurrió un error al cargar los datos.');
        return;
      }
    } catch (err) {
      console.error('Error cargando datos de función/película/butacas', err);
    }
  }

  private cargarButacasDesdeBack(butacasBack: any) {
    const lista: ButacaResponse[] = butacasBack.disponibilidadButaca;
    const seats: Seat[] = lista.map((b) => this.mapFromApi(b));
    this.seats.set(seats);

    const filas: string[] = Array.from(new Set(seats.map((s) => s.row)));
    this.rows = filas.sort().reverse();

    this.seatsPerRow = Math.max(...this.rows.map((r) => seats.filter((s) => s.row === r).length));
  }

  private mapFromApi(b: ButacaResponse): Seat {
    const fila = b.butaca.fila.letraFila;
    const nro = b.butaca.nroButaca;

    return {
      id: `${nro}${fila}`, // visual
      disponibilidadButacaId: b.id, // 👈 ESTE ES EL IMPORTANTE
      row: fila,
      number: nro,
      status: b.estadoDisponibilidadButaca.nombre,
    };
  }

  byRow(row: string) {
    return this.seats().filter((s) => s.row === row);
  }

  toggle(seat: Seat) {
    const sel = new Set(this.selectedIds());

    if (sel.has(seat.id)) {
      sel.delete(seat.id);
      this.setStatus(seat.id, 'LIBRE');
    } else {
      sel.add(seat.id);
      this.setStatus(seat.id, 'SELECCIONADA');
    }
    this.selectedIds.set(sel);
    this.updateTotals(sel.size);
  }

  updateTotals(count: number) {
    if (this.seleccion.precioButaca) {
      const precioBase = this.seleccion.precioButaca;

      if (precioBase && count > 0) {
        // Subtotal: Precio total sin descuentos
        const subtotalCalculado = count * precioBase;
        this.subtotal.set(subtotalCalculado);

        // Descuento: Se calcula el ahorro solo sobre UNA entrada
        // Si el descuento es 50%, el ahorro es precioBase * 0.5
        const ahorro = Math.round(precioBase * (this.descuento() / 100));
        this.descuentoMostrar.set(ahorro);

        // Total: Lo que realmente paga el usuario
        const totalConDescuento = subtotalCalculado - ahorro;
        this.total.set(totalConDescuento);
      } else {
        // Si no hay nada seleccionado, todo a cero
        this.subtotal.set(0);
        this.descuentoMostrar.set(0);
        this.total.set(0);
      }
    } else {
      alert('Ocurrió un error al cargar los datos.');
      return;
    }
  }

  totalSelectedCount() {
    return this.selectedIds().size;
  }

  private setStatus(id: string, status: string) {
    this.seats.update((arr) => arr.map((s) => (s.id === id ? { ...s, status } : s)));
  }

  trackBySeat(_i: number, s: Seat) {
    return s.id;
  }

  cancelar() {
    this.router.navigate(['/pelicula', this.pelicula!.id], {
      state: { pelicula: this.pelicula },
    });
  }

  continuar() {
    this.seleccion.asientos = Array.from(this.selectedIds());
    this.mostrarResumen = true;
  }

  cancelarResumen(): void {
    this.mostrarResumen = false;
  }

  async pagar() {
    try {
      const idsSeleccionados = this.seats()
        .filter((seat) => this.selectedIds().has(seat.id))
        .map((seat) => seat.disponibilidadButacaId); // 👈 number[]

      const payload = {
        funcionId: this.seleccion.funcionId,
        disponibilidadButacaIds: idsSeleccionados,
      };

      const resp = await this.apiService.crearVenta(payload);

      if (resp.urlPagoMP) {
        window.location.href = resp.urlPagoMP;
      } else {
        alert('No se pudo iniciar el pago');
        console.error(resp);
      }
    } catch (error: any) {
      console.error('🔥 ERROR EN ABRIR VENTA:', error?.response?.data || error);
      alert('Error al conectar con el servicio de pago');
    }
  }
}
