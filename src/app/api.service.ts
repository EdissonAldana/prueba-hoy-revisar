import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api'; // Reemplaza con la URL de tu backend si es diferente

  constructor(private http: HttpClient) { }

  registrarUsuario(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios`, userData); // Elimina "/registro"
  }

  iniciarSesion(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/login`, loginData);
  }

  obtenerDatos(): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get(`${this.apiUrl}/datos-protegidos`, { headers });
  }
}