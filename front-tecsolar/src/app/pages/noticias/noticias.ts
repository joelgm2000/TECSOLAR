import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias implements OnInit {
  noticias = signal<any[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);
  noticiaSeleccionada = signal<any | null>(null);

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  sanitizar(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html ?? '');
  }

  getImagen(noticia: any): string {
    return noticia._embedded?.['wp:featuredmedia']?.[0]?.source_url
      || noticia.jetpack_featured_media_url
      || '';
  }

  getTitulo(noticia: any): string {
    return noticia.title?.rendered?.trim() || '(Sin título)';
  }

  abrirModal(noticia: any) {
    this.noticiaSeleccionada.set(noticia);
    document.body.style.overflow = 'hidden';
  }

  cerrarModal() {
    this.noticiaSeleccionada.set(null);
    document.body.style.overflow = '';
  }

  cargarNoticias() {
    this.cargando.set(true);
    this.error.set(null);

    const urlWP = 'https://public-api.wordpress.com/wp/v2/sites/noticiastecsolar.wordpress.com/posts?_embed';

    this.http.get<any[]>(urlWP).subscribe({
      next: (data) => {
        this.noticias.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set('No se pudieron cargar las noticias.');
        this.cargando.set(false);
      }
    });
  }
}