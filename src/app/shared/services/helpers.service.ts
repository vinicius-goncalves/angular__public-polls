import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HelpersService {
    constructor() {}

    short(value: string) {
        return value.length >= 64 ? `${value.slice(0, 64)}...` : value;
    }
}
