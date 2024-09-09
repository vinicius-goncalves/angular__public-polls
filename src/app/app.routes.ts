import { Routes } from '@angular/router';
import { PollContentComponent } from './shared/components/poll-content/poll-content.component';
import { PollsComponent } from './shared/components/polls/polls.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/polls',
        pathMatch: 'full',
    },
    {
        path: 'polls',
        component: PollsComponent,
    },
    {
        path: 'poll/:id',
        component: PollContentComponent,
    },
];
