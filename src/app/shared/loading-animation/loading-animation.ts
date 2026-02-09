import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalStatusService } from '../../services/global-status.service';

@Component({
    selector: 'app-loading-animation',
    imports: [RouterOutlet],
    templateUrl: './loading-animation.html',
    styleUrl: './loading-animation.css',
})
export class LoadingAnimationComponent {
    isLoading: boolean;
    constructor(private globalStatusService: GlobalStatusService) {
        this.isLoading = this.globalStatusService.isLoading();
    }
}