import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component'; // Asegúrate de que la ruta sea correcta
import { RegistroLoginComponent } from './registro-login/registro-login.component'; // Asegúrate de que la ruta sea correcta
import { PerfilComponent } from './perfil/perfil.component'; // Asegúrate de que la ruta sea correcta
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'registro', component: RegistroLoginComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/inicio' } // Cualquier otra ruta redirige a inicio
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }