import { Component, OnInit } from '@angular/core';
import { noop, Observable, of, throwError } from 'rxjs';
import { map, shareReplay, tap, catchError, finalize } from 'rxjs/operators';

import { Course } from "../model/course";
import { createHttpObservable } from '../common/util';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {

        const http$ = createHttpObservable('api/courses');

        const courses$: Observable<Course[]> = http$.pipe(

            catchError(err => {

                console.log("Error occurred", err);

                return throwError(err);
                
            }),

            finalize(() => {

                console.log('Finalize executed..')

            }),

            tap(() => console.log("HTTP request executed")),

            map(res => Object.values(res['payload'])),

            shareReplay()
        );

        this.beginnersCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category == 'BEGINNER'))
        )

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category == 'ADVANCED'))
        )

    }

}
