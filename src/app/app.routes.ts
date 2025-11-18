import { Routes } from '@angular/router';
import { SeleccionButacaComponent } from './pages/SeleccionButaca/seleccion-butaca/seleccion-butaca';
import { ResumenSeleccionComponent } from './pages/ResumenSeleccion/resumen-seleccion/resumen-seleccion';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { CarteleraComponent } from './pages/cartelera/cartelera';
import { PeliculaComponent } from './pages/pelicula/pelicula';
import { notificaciondeenvioComponent } from './pages/NotificacionDeEnvio/notificaciondeenvio';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cartelera', component: CarteleraComponent },
  { path: 'pelicula/:id', component: PeliculaComponent },
  { path: 'seleccion-butaca', component: SeleccionButacaComponent },
  { path: 'resumen-seleccion', component: ResumenSeleccionComponent },
  { path: 'seleccion-butaca/:idFuncion', component: SeleccionButacaComponent },
  {path: 'notificaciondeenvio', component: notificaciondeenvioComponent}
];

