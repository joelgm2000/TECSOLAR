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
    { id: 'conjunto-la-rioja', nombre: 'Conjunto La Rioja', tipo: 'Residencial', loc: 'Valledupar', pot: '7.38 kWp', img: '', cargando: true },
    { id: 'proyecto-alfonso-lopez', nombre: 'Alfonzo Lopez', tipo: 'Residencial', loc: 'Valledupar', pot: '6.15 kWp', img: '', cargando: true },
    { id: 'proyecto-el-cerrito', nombre: 'Barrio El Cerrito', tipo: 'Residencial', loc: 'Valledupar', pot: '6.15 kWp', img: '', cargando: true },
    { id: 'proyecto-empresarial-cheagro', nombre: 'Cheagro', tipo: 'Empresarial', loc: 'Valledupar', pot: '12.30 kWp', img: '', cargando: true },
    { id: 'proyecto-erika-melo', nombre: 'Erika Melo', tipo: 'Residencial', loc: 'Valledupar', pot: '11.25 kWp', img: '', cargando: true },
    { id: 'proyecto-juanda-caribe', nombre: 'Juanda Caribe', tipo: 'Residencial', loc: 'Barranquilla', pot: '13.02 kWp', img: '', cargando: true },
    { id: 'proyecto-lux-visión', nombre: 'Lux Visión', tipo: 'Empresarial', loc: 'Valledupar', pot: '8.75 kWp', img: '', cargando: true },
    { id: 'proyecto-mazda-renault', nombre: 'Distribuidora Mazda Renault', tipo: 'Empresarial', loc: 'Valledupar', pot: '9.68 kWp', img: '', cargando: true },
    { id: 'proyecto-pedro-garcia', nombre: 'Pedro Garcia', tipo: 'Residencial', loc: 'Valledupar', pot: '7.20 kWp', img: '', cargando: true },
    { id: 'proyecto-pollo-arabe', nombre: 'Pollo Árabe', tipo: 'Empresarial', loc: 'Valledupar', pot: '2.700 kWp', img: '', cargando: true },
    { id: 'proyecto-ruby', nombre: 'Ruby', tipo: 'Residencial', loc: 'Valledupar', pot: '9.28 kWp', img: '', cargando: true },
    { id: 'proyecto-santillana', nombre: 'Santillana', tipo: 'Residencial', loc: 'Valledupar', pot: '8.61 kWp', img: '', cargando: true },
    { id: 'proyecto-strauch', nombre: 'Strauch', tipo: 'Residencial', loc: 'Valledupar', pot: '7.50 kWp', img: '', cargando: true },
    { id: 'proyecto-urb-los-campanos', nombre: 'Urbz Los Campanos', tipo: 'Residencial', loc: 'Valledupar', pot: '11.07 kWp', img: '', cargando: true },
    { id: 'proyecto-rincon-de-los-rosales', nombre: 'Rincón de los Rosales', tipo: 'Residencial', loc: 'Valledupar', pot: '9.92 kWp', img: '', cargando: true },
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