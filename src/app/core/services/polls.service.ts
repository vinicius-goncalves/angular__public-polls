import { Injectable } from '@angular/core';
import PollData from '../../types/poll/PollData.interface';

@Injectable({
    providedIn: 'root',
})
export class PollsService {
    protected polls: PollData[] = [];

    constructor() {
        for (let i = 0; i < 15; i++) {
            this.polls.push({
                id: String(i),
                title: 'Which programming language do you prefer?',
                description:
                    'We are want to know what programming languages you prefer. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi provident sequi, voluptas ratione corporis tenetur. Aperiam corporis optio dolor officia.',
                totalVotes: Math.floor(Math.random() * 15),
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            });
        }
    }

    getAllPolls() {
        return this.polls;
    }

    getPollById(id: string) {
        return this.polls.find((poll) => poll.id == id);
    }
}
