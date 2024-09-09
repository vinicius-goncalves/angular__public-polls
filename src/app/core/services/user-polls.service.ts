import { Injectable } from '@angular/core';
import UserPoll from '../../types/poll/UserPoll';

@Injectable({
    providedIn: 'root',
})
export class UserPollsService {
    storage: UserPoll[];

    constructor() {
        const s = localStorage.getItem('checked-polls');
        this.storage = s ? JSON.parse(s) : [];
    }

    isPollChecked(pollId: string) {
        const pollFound = this.storage.find(
            (checkedPoll) => checkedPoll.pollId === pollId,
        );
        return pollFound?.isPollChecked ?? false;
    }

    updatePolls() {
        localStorage.setItem('checked-polls', JSON.stringify(this.storage));
    }

    getCheckedPollDetails(pollId: string): UserPoll {
        const checkedPoll = this.storage.find(
            (checkedPoll) => checkedPoll.pollId == pollId,
        );

        return (checkedPoll ?? { isPollChecked: false }) as UserPoll;
    }

    saveCheck(id: string, questionId: string) {
        if (this.isPollChecked(id)) return;

        this.storage.push({
            pollId: id,
            isPollChecked: true,
            questionCheckedId: questionId,
        });

        this.updatePolls();
    }
}
