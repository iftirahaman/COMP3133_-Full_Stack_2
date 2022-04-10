import {Component} from '@angular/core'
import { DatePipe } from '@angular/common';

@Component({
    selector:'students',
    template:`<h2>{{ getTitle() }}</h2>
    <h3>{{ currentDate }}</h3>`,
    providers:[DatePipe]
})


export class StudentsComponent{
    title = "My List of Students";
    currentDate = new Date()
    getTitle(){
        return this.title
    }

    getCurrentDate(){
        return this.currentDate
    }
}