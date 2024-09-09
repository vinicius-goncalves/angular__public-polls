import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/components/button/button.component';
import { PollComponent } from './shared/components/poll/poll.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, PollComponent, ButtonComponent, CommonModule],
    outputs: ['colorChange'],
    templateUrl: './app.component.html',
})
export class AppComponent {}
