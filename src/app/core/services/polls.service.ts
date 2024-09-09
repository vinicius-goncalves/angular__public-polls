import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import Poll from '../../types/poll/PollData.interface';

@Injectable({
    providedIn: 'root',
})
export class PollsService {
    private url = 'http://localhost:3000/polls';

    constructor(private http: HttpClient) {}

    getAllPolls(): Observable<Poll[]> {
        return this.http.get<Poll[]>(this.url);
    }

    getPollById(id: string): Observable<Poll> {
        return this.http.get<Poll>(`${this.url}/${id}`);
    }

    getPollTotalVotes(id: string) {
        return this.getPollById(id).pipe(
            map((poll) =>
                poll.questions.reduce(
                    (total, question) => total + question.votes,
                    0,
                ),
            ),
        );
    }

    incrementPollVotes(pollId: string, questionId: string) {
        this.getPollById(pollId).subscribe((poll) => {
            const questions = poll.questions.map((question) => {
                if (question.id === questionId) {
                    return { ...question, votes: question.votes + 1 };
                }

                return question;
            });

            this.http
                .patch(`${this.url}/${pollId}`, {
                    questions,
                })
                .subscribe();
        });
    }
}
