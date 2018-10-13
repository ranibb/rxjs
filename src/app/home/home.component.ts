import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from "../model/course";
import { createHttpObservable } from '../common/util';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses: Course[];
    advancedCourses: Course[];

    constructor() {

    }

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
            courses => {

                this.beginnersCourses = courses.filter(course => course.category == 'BEGINNER');

                this.advancedCourses = courses.filter(course => course.category == 'ADVANCED');

            },
            noop,
            () => console.log('completed')
        );

    }

}
