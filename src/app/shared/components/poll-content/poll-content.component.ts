import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollsService } from '../../../core/services/polls.service';
import { UserPollsService } from '../../../core/services/user-polls.service';
import Poll, { Question } from '../../../types/poll/PollData.interface';
import UserPoll from '../../../types/poll/UserPoll';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { ButtonComponent } from '../button/button.component';
import { PollQuestionComponent } from '../poll-question/poll-question.component';

@Component({
    selector: 'app-poll-content',
    standalone: true,
    imports: [ButtonComponent, CustomDatePipe, PollQuestionComponent],
    templateUrl: './poll-content.component.html',
})
export class PollContentComponent implements OnInit {
    protected poll!: Poll;
    protected userPoll!: UserPoll;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private pollService: PollsService,
        private userPollService: UserPollsService,
    ) {}

    ngOnInit(): void {
        this.loadPoll();
        this.loadUserPoll();
    }

    getPollId() {
        return this.route.snapshot.paramMap.get('id')!;
    }

    loadTotalVotes() {
        this.pollService
            .getPollTotalVotes(this.getPollId())
            .subscribe((totalVotes) => {
                this.poll.totalVotes = totalVotes;
            });
    }

    loadPoll() {
        this.pollService.getPollById(this.getPollId()).subscribe({
            next: (pollFound) => {
                this.poll = pollFound as Poll;
            },
            complete: () => {
                this.loadTotalVotes();
            },
        });
    }

    loadUserPoll() {
        this.userPoll = this.userPollService.getCheckedPollDetails(
            this.getPollId(),
        );
    }

    updateTotalVotes(pollId: string, questionId: string) {
        this.poll.totalVotes += 1;
        this.pollService.incrementPollVotes(pollId, questionId);
    }

    updateUserPoll(questionClicked: Question) {
        const [pollId, questionId] = [this.getPollId(), questionClicked.id];
        this.userPollService.saveCheck(pollId, questionId);
        this.updateTotalVotes(pollId, questionId);
    }

    checkedEvent(questionClicked: Question) {
        this.updateUserPoll(questionClicked);
        this.loadUserPoll();
    }

    back() {
        this.router.navigate(['/polls']);
    }
}
