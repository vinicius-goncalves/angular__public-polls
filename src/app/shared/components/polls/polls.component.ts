import { Component, OnInit } from '@angular/core';
import { PollsService } from '../../../core/services/polls.service';
import PollData from '../../../types/poll/PollData.interface';
import { ButtonComponent } from '../button/button.component';
import { PollComponent } from '../poll/poll.component';

@Component({
    selector: 'app-polls',
    standalone: true,
    imports: [PollComponent, ButtonComponent],
    templateUrl: './polls.component.html',
})
export class PollsComponent implements OnInit {
    polls: PollData[] = [];

    constructor(private pollsService: PollsService) {}

    ngOnInit(): void {
        this.polls = this.pollsService.getAllPolls();
    }
}
