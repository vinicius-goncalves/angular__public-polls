import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HelpersService {
    constructor() {}

    short(value: string, len: number = 64) {
        return value.length >= len ? `${value.slice(0, len)}...` : value;
    }

    toPercentage(value: number): string {
        return `${Math.floor(value * 100)}%`;
    }
}
