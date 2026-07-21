import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink], // Importante para que funcione el routerLink de los botones
  templateUrl: './inicio.html',
  styleUrl: './inicio.css' // O la extensión que uses
})
export class Inicio implements OnInit {

  // 1. Agregas la variable proyectos
  proyectos: any[] = [
    { id: 'zuluaga-empresarial', nombre: 'Zuluaga', tipo: 'Empresarial', loc: 'Valledupar', pot: '72.60 kWp', img: '', cargando: true },
    { id: 'sirinesse-empresarial', nombre: 'Sirinesse', tipo: 'Empresarial', loc: 'Valledupar', pot: '39.93 kWp', img: '', cargando: true },
    { id: 'proyecto-buitrago', nombre: 'Buitrago', tipo: 'Empresarial', loc: 'Valledupar', pot: '18.15 kWp', img: '', cargando: true },
    { id: 'set-cars-empresarial', nombre: 'Set Cars', tipo: 'Empresarial', loc: 'Valledupar', pot: '17.36 kWp', img: '', cargando: true },
  
  ];

  // 2. Inyectas los servicios necesarios en el constructor
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  // 3. Ejecutas la lógica para buscar la imagen de portada de cada proyecto
  ngOnInit() {
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