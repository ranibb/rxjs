import { Component, OnInit } from '@angular/core';
import { interval, timer, fromEvent } from 'rxjs';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor() { }

    ngOnInit() {

        const intervals$ = timer(3000, 1000);

        const sub = intervals$.subscribe(val => {
            console.log('stream 1 => ' + val);
        });

        setTimeout(() => sub.unsubscribe(), 5000)

        const clicks$ = fromEvent(document, 'click');

        clicks$.subscribe(

            evt => console.log(evt),

            err => console.log(err),

            () => {
                console.log("completed")
            }

        );

    }

}
