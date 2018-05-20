import {Component, OnInit, ViewChild, ChangeDetectorRef} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {DashboardService} from "./dashboard.service";
import {AppService} from "../app.service";
import {CalendarComponent} from "ng-fullcalendar";
import {Options} from "fullcalendar";
import {EventSesrvice} from "./event.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  imgUrl: any;
  images = [];
  currentObj: any = {};
  status: string = '';
  itemTypes: any = [];
  events: any[];

  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  private showCollenderInterface: boolean = false;
  private showItemsOnly: boolean = false;
  private showMainCourse: boolean = false;
  private showStarter: boolean = false;

  constructor(private cdr:ChangeDetectorRef,protected eventService: EventSesrvice, private router: Router, private fb: FormBuilder, private loginService: LoginService, private dashboardService: DashboardService, private appService: AppService) {
    this.createForm();
    // this.calenderOPtions();
  }

  ngOnInit() {
    if (!this.loginService.userRole || this.loginService.userRole === undefined) {
    }
    if(this.loginService.userRole ==='admin'){
      this.showItemsOnly = true;
    }
    this.itemTypes = [
      {type: 'Starter'},
      {type: 'MainCourse'}
    ];
    this.setCalendar();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: [null, Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required]
    });
  }


  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
        this.currentObj = {
          url: this.imgUrl,
          title: '',
          price: 12,
          category: ''
        }

        this.form.controls['avatar'].setValue(this.imgUrl);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formModel = this.form.value;
      this.loading = true;
      this.status = 'Image uploaded suceesfully.';
      this.currentObj.title = this.form.controls['name'].value;
      this.currentObj.price = this.form.controls['price'].value;
      this.currentObj.category = this.form.controls['category'].value;
      setTimeout(() => {
        this.status = '';
      }, 1000);
      this.appService.images.push(this.currentObj);
      this.clearFile();
      this.form.reset();

    }
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.imgUrl = false;
  }

  deleteImg(url: any) {
    let findIndexValue = this.appService.images.findIndex(item => item.url === url);
    if (findIndexValue !== -1) {
      this.appService.images.splice(findIndexValue, 1);
    }
  }

  logout() {
    this.router.navigate(["login"]);
  }

//
  clickButton(model: any) {
    this.displayEvent = model;
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
    if (this.displayEvent.event.title === 'Add Maincourse') {
      this.showMainCourse = true;
      this.showStarter = false;
    } else if (this.displayEvent.event.title === 'Add starter') {
      this.showStarter = true;
      this.showMainCourse = false;
    }
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

  calendarSelect() {
    this.showCollenderInterface = true;
    this.showItemsOnly = false;
  }

  showListItems() {
    this.showItemsOnly = true;
  }
  itemSelected(item){
    console.log('Selected Item',item);
     let findIndexValue =  this.eventService.myData.findIndex(item=> (item.title === this.displayEvent.event.title)&&(item.id === this.displayEvent.event.id))
     console.log("****",findIndexValue);
     if(findIndexValue!==-1){
       this.eventService.myData[findIndexValue]['title'] = this.displayEvent.event.title+'Added successfully';
       this.eventService.myData = [...this.eventService.myData];
       this.calendarOptions.events = this.eventService.myData;
       this.calendarOptions = {...this.calendarOptions};
      // this.setCalendar();
       this.cdr.detectChanges();

     }
  }

  setCalendar(){
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    this.eventService.myData=[];
    for(let i=1;i<31;i++){
      this.eventService.myData.push({
        id:i,
        title: 'Add starter',
        start: yearMonth + '-'+i
      });
      this.eventService.myData.push({
        id:i,
        title: 'Add Maincourse',
        start: yearMonth + '-'+i
      });
    }

    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events:this.eventService.myData
    };
  }

}
