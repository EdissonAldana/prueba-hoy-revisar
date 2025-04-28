import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-perfil',
  standalone: true, // Marca el componente como standalone
  imports: [
    CommonModule, // Importa CommonModule para usar *ngIf
    // Puedes añadir aquí otros módulos que necesites en este componente,
    // como FormsModule si tienes formularios.
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  isLoading: boolean = false;
  userData: any; // Define el tipo según tu interfaz de usuario
  errorMessage: string = '';

  // Ejemplo de una función para cargar datos (puedes tener la tuya)
  loadUserProfile() {
    this.isLoading = true;
    // Simulación de una llamada asíncrona
    setTimeout(() => {
      this.isLoading = false;
      this.userData = { nombre: 'Ejemplo Nombre', correo: 'ejemplo@correo.com' };
    }, 1500);
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }
}