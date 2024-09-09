import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PollsService } from '../../../core/services/polls.service';
import Poll from '../../../types/poll/PollData.interface';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { HelpersService } from '../../services/helpers.service';
import { ButtonComponent } from '../button/button.component';

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
    styleUrl: './poll.component.css',
})
export class PollComponent implements OnChanges {
    @Input({ required: false }) pollData: Partial<Poll> = {
        id: '',
        title: '',
        description: '',
        expiresAt: new Date(),
        createdAt: new Date(),
        totalVotes: 0,
    };

    constructor(
        private pollsService: PollsService,
        private helpersService: HelpersService,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.pollsService
            .getPollTotalVotes(this.pollData.id!)
            .subscribe((totalVotes) => {
                this.pollData.totalVotes = totalVotes;
            });

        this.pollData.description = this.helpersService.short(
            this.pollData.description!,
            64,
        );

        this.pollData.title = this.helpersService.short(
            this.pollData.title!,
            64,
        );
    }
}
