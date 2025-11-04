import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notificacionenvio',
  templateUrl: './notificaciondeenvio.html',
  styleUrls: ['./notificaciondeenvio.css']
})
export class notificaciondeenvioComponent {
  constructor(private router: Router) {}

  volverACartelera() {
    this.router.navigate(['/cartelera']);
  }
  volver(): void {
    this.router.navigate(['/cartelera']);
  }
}
