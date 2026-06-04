import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
// 1. Variable para saber si el menú móvil está abierto
  isMenuOpen = false;

  // 2. Función para alternar (abrir/cerrar) con el botón de hamburguesa
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // 3. Función para cerrar el menú cuando se hace clic en un enlace
  closeMenu() {
    this.isMenuOpen = false;
  }
}
