import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { LazyVideoDirective } from '../../directives/lazy-video.directive';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, LazyVideoDirective],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  cargandoPagina: boolean = true;

  @ViewChild('carruselInformativos') carruselInformativos!: ElementRef<HTMLElement>;
  @ViewChild('carruselTestimonios') carruselTestimonios!: ElementRef<HTMLElement>;

  proyectos: any[] = [
    { id: 'zuluaga-empresarial', nombre: 'Zuluaga', tipo: 'Empresarial', loc: 'Valledupar', pot: '72.60 kWp', img: '', cargando: true },
    { id: 'sirinesse-empresarial', nombre: 'Sirinesse', tipo: 'Empresarial', loc: 'Valledupar', pot: '39.93 kWp', img: '', cargando: true },
    { id: 'proyecto-pollo-arabe', nombre: 'Pollo Árabe', tipo: 'Empresarial', loc: 'Valledupar', pot: '2.700 kWp', img: '', cargando: true },
    { id: 'alumbrado-publico', nombre: 'Alumbrado Publico', tipo: 'alumbrado-publico', loc: 'Valledupar', pot: '', img: '', cargando: true },
 
  ];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Pantalla de carga mínima de 1.5 segundos
    setTimeout(() => {
      this.cargandoPagina = false;
      this.cdr.detectChanges();
    }, 1500);

    // Lógica de carga de imágenes
    this.proyectos.forEach((p, index) => {
      this.http.get<string[]>(`/proyectos/${p.id}/fotos.json`).subscribe({
        next: (lista) => {
          this.proyectos[index] = {
            ...p,
            img: lista.length > 0 ? `/proyectos/${p.id}/${lista[0]}` : '',
            cargando: false
          };
          this.cdr.detectChanges();
        },
        error: () => {
          this.proyectos[index] = { ...p, cargando: false };
          this.cdr.detectChanges();
        }
      });
    });
  }
}