import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollsService } from '../../../core/services/polls.service';
import PollData from '../../../types/poll/PollData.interface';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-poll-content',
    standalone: true,
    imports: [ButtonComponent, CustomDatePipe],
    templateUrl: './poll-content.component.html',
})
export class PollContentComponent implements OnInit {
    @Input() pollData: PollData = {
        id: '',
        title: '',
        description: '',
        totalVotes: 0,
        expiresAt: new Date(),
        createdAt: new Date(),
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private pollService: PollsService,
    ) {}

    ngOnInit(): void {
        this.pollData.id = this.route.snapshot.paramMap.get('id')!;
        const poll = this.pollService.getPollById(this.pollData.id);
        this.pollData = { ...this.pollData, ...poll };
    }

    back() {
        this.router.navigate(['/polls']);
    }
}
