import { Routes } from '@angular/router';
import { SeleccionButacaComponent } from './pages/SeleccionButaca/seleccion-butaca/seleccion-butaca';
import { ResumenSeleccionComponent } from './pages/ResumenSeleccion/resumen-seleccion/resumen-seleccion';

export const routes: Routes = [
  { path: 'seleccion-butaca', component: SeleccionButacaComponent },
  { path: 'resumen-seleccion', component: ResumenSeleccionComponent },
  { path: '', redirectTo: 'seleccion-butaca', pathMatch: 'full' },
];
