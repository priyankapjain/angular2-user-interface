import {Component, OnInit, ViewChild, ChangeDetectorRef} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {LoginService} from "../login/login.service";
import {Router} from "@angular/router";
import {DashboardService} from "./dashboard.service";
import {AppService} from "../app.service";
import {CalendarComponent} from "ng-fullcalendar";
import {Options} from "fullcalendar";
import {EventSesrvice} from "./event.service";


// Step 1: get jquery in your project
//npm install jquery
//Step 2: add type for jquery
//npm install -D @types/jquery
//Step 3: Use it in your component!
//import * as $ from 'jquery';
// Ready to use $!


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  alreadySelectedMsg: string;

  form: FormGroup;
  loading: boolean = false;
  imgUrl: any;
  images = [];
  currentObj: any = {};
  status: string = '';
  itemTypes: any = [];
  events: any[];
  eventPriceCal:any=[];

  calendarOptions: Options;
  displayEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  private showCollenderInterface: boolean = false;
  private showItemsOnly: boolean = false;
  private showMainCourse: boolean = false;
  private showStarter: boolean = false;
  private startsAvail: boolean = false;
  private mainCourseAvail: boolean = false;
  private adminMsg: string='';
  private itemsSelected: boolean = false;
  private selectedItemsToShow: any=[];

  constructor(private cdr:ChangeDetectorRef,protected eventService: EventSesrvice, private router: Router, private fb: FormBuilder, private loginService: LoginService, private dashboardService: DashboardService, private appService: AppService) {
    this.createForm();
    // this.calenderOPtions();
  }

  ngOnInit() {
   this.initilizeData();
  }

  initilizeData(){
    if (!this.loginService.userRole || this.loginService.userRole === undefined) {
    }
    if(this.loginService.userRole ==='admin'){
      this.showItemsOnly = true;
    }
    this.itemTypes = [
      {type: 'Starter'},
      {type: 'MainCourse'}
    ];
    this.setCalendar(); // Initlize calendar setup
    let j=0;  // below code for setting month calculation based on user selected items
    for(let i=0;i<4;i++){
      this.eventPriceCal.push(
        {
          startDate:j+1,
          price:0,
          endDate:j+7
        }
      );
      j=j+7;
    }
    if(this.loginService.userRole === 'user'){
      this.showListItems();
      this.checkMenusAvailability();
    }
    this.images = this.appService.images;
  }
// FOrm create for upload food image data
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: [null, Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required]
    });
  }


  readUrl(event: any) { // upload iamges and read items
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

  // setting calendar
  setCalendar(){
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    this.eventService.myData=[];
    for(let i=1;i<31;i++){
      if(i!==9 && i!==23 ){
        this.eventService.myData.push({
          id:i,
          title: 'Add starter',
          start: yearMonth + '-'+i,
          checked:false
        });
        this.eventService.myData.push({
          id:i,
          title: 'Add Maincourse',
          start: yearMonth + '-'+i,
          checked:false
        });
      }
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

  onSubmit() { // form submit for image upload
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
      this.checkMenusAvailability();
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
 // below code for calendar events handling

  eventClick(model: any) {
    this.startsAvail = false;
    this.mainCourseAvail = false;
    this.checkMenusAvailability();
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
    let findIndexValue =  this.eventService.myData.findIndex(item=> (item.title === this.displayEvent.event.title));
    if(findIndexValue!==-1 &&  this.eventService.myData[findIndexValue].checked){
      this.alreadySelectedMsg = 'Item already selected and Please select another item for another date';
      setTimeout(()=>{
       this.alreadySelectedMsg ='';
      },2500);
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
    this.showCollenderInterface = false;
  }

  // item select 
  itemSelected(item,index){
    console.log('Selected Item',item);
     let findIndexValue =  this.eventService.myData.findIndex(item=> (item.title === this.displayEvent.event.title)&&(item.id === this.displayEvent.event.id))
     if(findIndexValue!==-1 &&  !this.eventService.myData[findIndexValue].checked){
       let menu = this.displayEvent.event.title.split(' ')[1];
       this.eventService.myData[findIndexValue]['title'] =item.title+' '+ menu+' added successfully'+'-'+item.price+'';
       this.eventService.myData = [...this.eventService.myData];
       this.calendarOptions.events = this.eventService.myData;
       this.calendarOptions = {...this.calendarOptions};
       this.events = this.eventService.myData;
      this.eventPriceCalculation(this.displayEvent,item);
      this.eventService.myData[findIndexValue].checked = true;
       this.cdr.detectChanges();
     } else {
         this.alreadySelectedMsg = 'Select another item for another date';
         setTimeout(()=>{
          this.alreadySelectedMsg ='';
         },2500);
     }
     let starter = this.appService.images.filter(function(event){
      return event.category == 'Starter'; 
     });
     let mainCourse = this.appService.images.filter(function(event){
      return event.category == 'MainCourse'; 
     });
     if(item.category === 'Starter'){
      this.appService.images[index].checked = !this.appService.images[index].checked;
     } else if(item.category === 'MainCourse'){
      this.appService.images[index].checked = !this.appService.images[index].checked;
     }
     this.appService.images.forEach((item,indexV,arr)=>{
       if(index !== indexV && item.category === arr[indexV].category ){
        arr[indexV].checked = false;
       }
     })
     
  }


  checkMenusAvailability(){
    this.startsAvail = false;
    this.mainCourseAvail = false;
   let imgList =  this.appService.images;
   let count=0;
  for(let i=0;i<imgList.length;i++){
      if(imgList[i].category==='Starter'){
        this.startsAvail = true;
        count++;
      }
    if(imgList[i].category==='MainCourse'){
      this.mainCourseAvail = true;
      count++
    }
    if(count>=14){
      this.adminMsg ='';
    } else {
      this.adminMsg ='Please add more than 7 images(starters & main course)';
      if(this.loginService.userRole ==='user'){
        this.adminMsg ='';
      }
    }
  }
  }
  eventPriceCalculation(event,item){
    let date = ((event.event.start._i).split('-'))[2];
    for(let j=0;j<4;j++){
      if(date>= this.eventPriceCal[j].startDate && date <= this.eventPriceCal[j].endDate){
        this.eventPriceCal[j].price = this.eventPriceCal[j].price+item.price;
        this.itemsSelected = true;
        if(this.eventPriceCal[j] &&this.eventPriceCal[j].selectedItem ===undefined){
          this.eventPriceCal[j]['selectedItem']=[];
          this.eventPriceCal[j]['selectedItem'].push({'item':item,'selectedDate':event.event.start._i});
        } else {
          this.eventPriceCal[j]['selectedItem'].push({'item':item,'selectedDate':event.event.start._i});
        }
      }
    }
  }
  itemToShow(item){
     this.selectedItemsToShow = item;
  }

}
