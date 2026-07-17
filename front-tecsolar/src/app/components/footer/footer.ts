import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  // Lista de tus sucursales exactas y ordenadas correctamente
  ciudades = [
    { nombre: 'Valledupar', direccion: 'Cra 12 N° 13b-02 – Barrio Obrero, Valledupar, Colombia' }
  ];

  ciudadSeleccionada = this.ciudades[0]; // Inicia en Valledupar por defecto
  mapaUrlSegura!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.actualizarMapa(this.ciudadSeleccionada);
  }

  // Función que actualiza el mapa
  actualizarMapa(ciudad: any) {
    this.ciudadSeleccionada = ciudad;
    
    // Generamos el enlace de Google Maps con la dirección exacta (URL corregida)
    const url = `https://maps.google.com/maps?q=${encodeURIComponent(ciudad.direccion)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    
    // Angular EXIGE sanitizar la URL para los iframes por seguridad
    this.mapaUrlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Detecta el cambio en el menú desplegable (Select)
  alCambiarCiudad(event: any) {
    const nombreCiudad = event.target.value;
    const ciudadEncontrada = this.ciudades.find(c => c.nombre === nombreCiudad) || this.ciudades[0];
    this.actualizarMapa(ciudadEncontrada);
  }
}