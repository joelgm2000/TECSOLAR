import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalle-proyecto',
  standalone: true,
  imports: [RouterLink], // Importante para el botón de volver
  templateUrl: './detalle-proyecto.html'
})
export class DetalleProyecto implements OnInit {
  id: string | null = '';
  imagenes: string[] = [];
  imagenExpandida: string | null = null; // Para el previsualizador

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // 1. Obtenemos el ID de la URL
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      // 2. Buscamos el JSON de ese proyecto
      this.http.get<string[]>(`/proyectos/${this.id}/fotos.json`).subscribe({
        next: (lista) => {
          // 🟢 LA SOLUCIÓN: Agregamos la ruta completa a cada foto
          this.imagenes = lista.map(foto => `/proyectos/${this.id}/${foto}`);
          this.cdr.detectChanges();
        },
        error: () => {
          console.error('Error cargando el JSON de fotos');
        }
      });
    }
  }

  // Funciones para el previsualizador (Lightbox)
  abrirImagen(img: string) {
    this.imagenExpandida = img;
  }

  cerrarImagen() {
    this.imagenExpandida = null;
  }
}