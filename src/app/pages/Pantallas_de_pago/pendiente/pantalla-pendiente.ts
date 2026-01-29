import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../../shared/header/header';

@Component({
    selector: 'app-pantalla-pendiente',
    imports: [CommonModule, ReactiveFormsModule, Header],
    templateUrl: './pantalla-pendiente.html',
    styleUrl: './pantalla-pendiente.css',
})
export class PantallaPendienteComponentt implements OnInit, OnDestroy {
    contador = 15;
    private intervalo: any;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.intervalo = setInterval(() => {
            this.contador--;
            if (this.contador === 0) {
                clearInterval(this.intervalo);
                this.router.navigate(['/cartelera']);
            }
        }, 1000);
    }

    ngOnDestroy(): void {
        if (this.intervalo) {
            clearInterval(this.intervalo);
        }
    }

    volver(): void {
        this.router.navigate(['/cartelera']);
    }
}
