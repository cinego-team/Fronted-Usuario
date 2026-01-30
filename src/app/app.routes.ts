import { Routes } from '@angular/router';
import { SeleccionButacaComponent } from './pages/SeleccionButaca/seleccion-butaca';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { CarteleraComponent } from './pages/cartelera/cartelera';
import { PeliculaComponent } from './pages/pelicula/pelicula';
import { notificaciondeenvioComponent } from './pages/NotificacionDeEnvio/notificaciondeenvio';
import { MiUsuarioComponent } from './pages/miUsuario/mi-usuario';
import { PantallaExitoComponent } from './pages/Pantallas_de_pago/exito/pantalla-exito';
import { PantallaFracasoComponent } from './pages/Pantallas_de_pago/fracaso/pantalla-fracaso';
import { PantallaPendienteComponent } from './pages/Pantallas_de_pago/pendiente/pantalla-pendiente';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cartelera', component: CarteleraComponent },
    { path: 'pelicula/:id', component: PeliculaComponent },
    { path: 'seleccion-butaca', component: SeleccionButacaComponent },
    { path: 'seleccion-butaca/:idFuncion', component: SeleccionButacaComponent },
    { path: 'notificaciondeenvio', component: notificaciondeenvioComponent },
    { path: 'mi-usuario', component: MiUsuarioComponent },
    { path: 'pantalla-exito', component: PantallaExitoComponent },
    { path: 'pantalla-fracaso', component: PantallaFracasoComponent },
    { path: 'pantalla-pendiente', component: PantallaPendienteComponent },
];

