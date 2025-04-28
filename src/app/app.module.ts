import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar si lo usas
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar si haces peticiones al backend
import { RouterModule } from '@angular/router'; // Asegúrate de importar si usas rutas

import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component'; // Asegúrate de que la ruta sea correcta
import { AppRoutingModule } from './app-routing.module'; // Asegúrate de que la ruta sea correcta
import { RegistroLoginComponent } from './registro-login/registro-login.component'; // Importamos RegistroLoginComponent

@NgModule({
  declarations: [
    AppComponent,
    // Declara aquí todos tus otros componentes que NO son standalone
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule, // Asegúrate de incluir RouterModule
    AppRoutingModule, // Asegúrate de incluir tu módulo de rutas
    PerfilComponent, // Importa el componente standalone
    RegistroLoginComponent, // ¡Importamos RegistroLoginComponent en imports!
    // Importa aquí todos tus otros módulos (ej: otros módulos de características)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }