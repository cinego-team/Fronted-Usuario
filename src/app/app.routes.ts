import { Routes } from '@angular/router';
import { SeleccionButacaComponent } from './pages/SeleccionButaca/seleccion-butaca/seleccion-butaca';
import { ResumenSeleccionComponent } from './pages/ResumenSeleccion/resumen-seleccion/resumen-seleccion';
import { LoginComponent } from './pages/login/login';
import {RegisterComponent} from "./pages/register/register";

export const routes: Routes = [
  { path: 'seleccion-butaca', component: SeleccionButacaComponent },
  { path: 'resumen-seleccion', component: ResumenSeleccionComponent },
  { path: '', redirectTo: 'seleccion-butaca', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent}
];
