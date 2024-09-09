import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PollsService } from '../../../core/services/polls.service';
import { UserPollsService } from '../../../core/services/user-polls.service';
import { Question } from '../../../types/poll/PollData.interface';
import UserPoll from '../../../types/poll/UserPoll';
import { HelpersService } from '../../services/helpers.service';

@Component({
    selector: 'app-poll-question',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './poll-question.component.html',
    styleUrl: './poll-question.component.css',
})
export class PollQuestionComponent implements OnInit {
    @Input() pollIdContext = '';
    @Input() pollQuestion!: Question & { votesPercentage?: string };
    @Input() userPoll: UserPoll = {
        isPollChecked: false,
        pollId: '',
        questionCheckedId: '',
    };

    @Output() checkedEvent = new EventEmitter<Question>();

    constructor(
        private pollService: PollsService,
        private helpersService: HelpersService,
        private checkedPollsService: UserPollsService,
    ) {}

    ngOnInit(): void {
        this.loadPollVotesPercentage();
    }

    loadPollVotesPercentage() {
        this.pollService
            .getPollTotalVotes(this.pollIdContext)
            .subscribe((totalVotes) => {
                const diff = this.pollQuestion.votes / totalVotes;
                const percentage = this.helpersService.toPercentage(diff);
                this.pollQuestion.votesPercentage = percentage;
            });
    }

    isChecked() {
        return (
            this.userPoll.isPollChecked &&
            this.userPoll.questionCheckedId === this.pollQuestion.id
        );
    }

    checked() {
        this.checkedEvent.emit(this.pollQuestion);
    }
}
