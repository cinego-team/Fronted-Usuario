import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenTimeoutService } from './pages/axios_service/tokenTimeout.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected readonly title = signal('Cine-Go');
    constructor(private tokenTimeoutService: TokenTimeoutService) { }
}
