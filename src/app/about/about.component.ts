import { Component, OnInit } from '@angular/core';
import { noop, of, concat, interval, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');

        const sub = http$.subscribe(val => console.log(val));
        
        setTimeout(() => sub.unsubscribe(), 0)

    }

}