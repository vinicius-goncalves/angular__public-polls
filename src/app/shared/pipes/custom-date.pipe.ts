import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate',
    standalone: true,
})
export class CustomDatePipe implements PipeTransform {
    transform(value: string | Date, ...args: unknown[]): unknown {
        const date = new Date(value);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',

            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
}
