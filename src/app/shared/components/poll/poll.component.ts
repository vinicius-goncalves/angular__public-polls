import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { ButtonComponent } from '../button/button.component';
import PollData from '../../../types/poll/PollData.interface';

@Component({
    selector: 'app-poll',
    standalone: true,
    imports: [
        ButtonComponent,
        CustomDatePipe,
        DatePipe,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './poll.component.html',
})
export class PollComponent implements OnChanges {
    @Input({ required: false }) pollData: PollData = {
        id: '',
        title: '',
        description: '',
        totalVotes: 0,
        expiresAt: new Date(),
        createdAt: new Date(),
    };

    // constructor(private helpersService: HelpersService)

    ngOnChanges(changes: SimpleChanges): void {
        // if (changes['pollData'].) {
        //     // this.helpersService.short();
        // }
    }
}
