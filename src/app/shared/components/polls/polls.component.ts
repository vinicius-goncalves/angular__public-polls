import { Component, OnInit } from '@angular/core';
import { PollsService } from '../../../core/services/polls.service';
import Poll from '../../../types/poll/PollData.interface';
import { ButtonComponent } from '../button/button.component';
import { PollComponent } from '../poll/poll.component';

@Component({
    selector: 'app-polls',
    standalone: true,
    imports: [PollComponent, ButtonComponent],
    templateUrl: './polls.component.html',
})
export class PollsComponent implements OnInit {
    polls!: Poll[];

    constructor(private pollsService: PollsService) {}

    ngOnInit(): void {
        this.pollsService.getAllPolls().subscribe({
            next: (polls) => {
                this.polls = polls as Poll[];
            },
        });
    }

    getPollById(id: string) {
        console.log(id);
    }
}
