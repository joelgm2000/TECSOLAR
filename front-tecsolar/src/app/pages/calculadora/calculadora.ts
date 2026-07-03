import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css',
})
export class Calculadora {
  consumoMensual: number | null = null;
  hsp: number = 5.6;
  resultado: any = null;
  error: string = '';

  calcular() {
    this.error = '';
    
    // Validación: Consumo debe ser mayor a 0 y no vacío
    if (!this.consumoMensual || this.consumoMensual <= 0) {
      this.error = 'Por favor, ingresa un consumo mensual válido mayor a 0.';
      this.resultado = null;
      return;
    }

    // 1. kW a generar (Factor 1.25)
    const kwAGenerar = this.consumoMensual * 1.25;
    
    // 2. Potencia mes por panel
    const potenciaPanelMes = this.hsp * 0.8 * 0.63 * 30;
    
    // 3. Paneles requeridos
    const panelesRequeridos = Math.ceil(kwAGenerar / potenciaPanelMes);
    
    // 4. Inversor
    const potenciaTotalKWp = panelesRequeridos * 0.63;
    const capacidadInversor = Math.ceil(potenciaTotalKWp / 1.3);

    this.resultado = {
      paneles: panelesRequeridos,
      inversor: capacidadInversor,
      totalKWp: potenciaTotalKWp.toFixed(2),
      consumo: this.consumoMensual
    };
  }

  enviarWhatsApp() {
    const numero = '573137139197';
    const mensaje = `Hola TecSolar, me gustaría una cotización basada en mi cálculo:
    - Consumo mensual: ${this.resultado.consumo} kWh
    - Paneles requeridos: ${this.resultado.paneles}
    - Potencia del sistema: ${this.resultado.totalKWp} kWp
    - Inversor recomendado: ${this.resultado.inversor} kW
    
    Quedo atento a su asesoría profesional.`;
    
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
  }
}