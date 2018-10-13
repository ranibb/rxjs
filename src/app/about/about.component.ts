import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { map } from 'rxjs/operators';

import { createHttpObservable } from '../common/util';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor() { }

    ngOnInit() {

        const http$ = createHttpObservable('api/courses');

        const courses$ = http$.pipe(
            // Obtain the value of payload can be done in 2 ways:

            // 1 some way
            // map((res:any) => res.payload)

            // 2 standard JavaScript 
            map(res => Object.values(res['payload']))
        );

        courses$.subscribe(
            courses => console.log(courses),
            noop,
            () => console.log('completed')
        );

    }

}