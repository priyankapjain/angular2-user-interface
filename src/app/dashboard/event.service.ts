import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
@Injectable()
export class EventSesrvice {
  public myData:any=[];
  public getEvents(): Observable<any> {
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    let data: any = [{
      title: 'All Day Event',
      start: yearMonth + '-01'
    },
      {
        title: 'Long Event',
        start: yearMonth + '-07',
        end: yearMonth + '-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: yearMonth + '-09T16:00:00'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: yearMonth + '-16T16:00:00'
      },
      {
        title: 'Conference',
        start: yearMonth + '-11',
        end: yearMonth + '-13'
      },
      {
        title: 'Meeting',
        start: yearMonth + '-12T10:30:00',
        end: yearMonth + '-12T12:30:00'
      },
      {
        title: 'Lunch',
        start: yearMonth + '-12T12:00:00'
      },
      {
        title: 'Meeting',
        start: yearMonth + '-12T14:30:00'
      },
      {
        title: 'Happy Hour',
        start: yearMonth + '-12T17:30:00'
      },
      {
        title: 'Dinner',
        start: yearMonth + '-12T20:00:00'
      },
      {
        title: 'Birthday Party',
        start: yearMonth + '-13T07:00:00'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: yearMonth + '-28'
      },
      {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: yearMonth + '-3'
      }
      ];

    //let myData=[];
    // for(let i=1;i<31;i++){
    //   this.myData.push({
    //     id:i,
    //     title: 'Add starter',
    //     start: yearMonth + '-'+i
    //   });
    //   this.myData.push({
    //     id:i,
    //     title: 'Add Maincourse',
    //     start: yearMonth + '-'+i
    //   });
    // }

    return Observable.of(this.myData);
  }
};
