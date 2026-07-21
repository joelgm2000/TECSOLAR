import { Component, signal, ChangeDetectorRef } from '@angular/core'; // 1. Agregamos ChangeDetectorRef
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  cargando = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    // Verificamos si es la primera vez que entra en esta sesión
    const yaVisito = sessionStorage.getItem('yaVisito');
    
    if (!yaVisito) {
      this.cargando = true;
      sessionStorage.setItem('yaVisito', 'true');
      
      // Forzamos el cierre de carga después de un tiempo mínimo
      setTimeout(() => {
        this.cargando = false;
        this.cdr.detectChanges();
      }, 2500); // 2.5 segundos para que los videos "se preparen"
    }

    // Opcional: Si quieres que cada vez que cambie de página también se sienta fluido, 
    // pero sin el bloque gigante de carga, puedes reducir este tiempo a 300ms
  }
}