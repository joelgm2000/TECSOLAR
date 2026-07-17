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

  // Lista de números corporativos (con prefijo 57 de Colombia)
  private numerosCorporativos: string[] = [
    '573225968487', // Corporativo 1
    '573153934424'  // Corporativo 2
  ];

  calcular() {
    this.error = '';
    
    if (!this.consumoMensual || this.consumoMensual <= 0) {
      this.error = 'Por favor, ingresa un consumo mensual válido mayor a 0.';
      this.resultado = null;
      return;
    }

    const kwAGenerar = this.consumoMensual * 1.25;
    const potenciaPanelMes = this.hsp * 0.8 * 0.63 * 30;
    const panelesRequeridos = Math.ceil(kwAGenerar / potenciaPanelMes);
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
    if (!this.resultado) return;

    // Selecciona aleatoriamente uno de los dos números para distribuir los leads
    const indiceAleatorio = Math.floor(Math.random() * this.numerosCorporativos.length);
    const numeroDestino = this.numerosCorporativos[indiceAleatorio];

    const mensaje = `Hola TecSolar, me gustaría una cotización basada en mi cálculo:
- Consumo mensual: ${this.resultado.consumo} kWh
- Paneles requeridos: ${this.resultado.paneles}
- Potencia del sistema: ${this.resultado.totalKWp} kWp
- Inversor recomendado: ${this.resultado.inversor} kW

Quedo atento a su asesoría profesional.`;
    
    // Abre el chat en una nueva pestaña (funciona tanto en web como en móvil)
    window.open(`https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer');
  }
}