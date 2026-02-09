import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenTimeoutService } from './services/tokenTimeout.service';
import { LoadingAnimationComponent } from './shared/loading-animation/loading-animation';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoadingAnimationComponent],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('Cine-Go');
    constructor(private tokenTimeoutService: TokenTimeoutService) { }
}
