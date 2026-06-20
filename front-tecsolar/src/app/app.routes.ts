import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Servicios } from './pages/servicios/servicios';
import { Proyectos } from './pages/proyectos/proyectos';
import { DetalleProyecto } from './pages/detalle-proyecto/detalle-proyecto';
import { Noticias } from './pages/noticias/noticias';


export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio },
  { path: 'servicios', component: Servicios },
  { path: 'proyectos', component: Proyectos },
  { path: 'proyecto/:id', component: DetalleProyecto }, 
  { path: 'noticias', component: Noticias }, 

  { path: '**', redirectTo: 'inicio' },                
];