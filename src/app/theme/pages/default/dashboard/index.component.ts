
import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaService } from 'ng2-dragula';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],


})
export class IndexComponent {

  buttonOptions: any;
  popupVisible = false;
  widgetOptions = {};
  valueChangeEvents: any[];
  widgets: any;
  widget: any;
  popupConfigVisible = false;
  popupInfoVisible = false;

  constructor() {
    this.widget = {};
    this.widgets = [];
  }


  from_back = [{ title: 'title 1', startValue: 0, endValue: 5, tickInterval: 2.5, sub_title: 'sub Tit3', type: 3, align: 'right', possition: 1 },
  { title: 'title 2', nbr1: 33, nbr2: 9, sub_title: 'sub Tit', type: 2, align: 'left', possition: 2 },
  { title: 'title 3', nbr1: 3, nbr2: 9, sub_title: 'sub Title 3', type: 2, align: 'left', possition: 3 },

  ];

  ngAfterViewInit() {
  }

  showWidgetPopup() {
    this.popupVisible = true;
  }

  addWidget(event) {

    console.log(event);
    console.log(this.widget);
    //this.widgets.push({title : this.widget.title , type : this.widget.type})
  }

  doSomething2(event) {

  }

  ngOnInit() {

    this.widgets = this.from_back;


    this.widgets.sort(function(a, b) {
      let posA = a.possition;
      var posB = b.possition;

      if (posA < posB) return -1;
      if (posA > posB) return 1;

      return 0;
    });



    this.buttonOptions = {
      text: 'ENREGISTER',
      type: 'success',
      useSubmitBehavior: true
    };

    this.valueChangeEvents = [
      {
        id: 1,
        name: 'widget 1'
      },
      {
        id: 2,
        name: 'widget 2'
      },
      {
        id: 3,
        name: 'widget 3'
      },
      {
        id: 4,
        name: 'widget 4'
      }

    ];



    this.widgetOptions = {
      displayExpr: 'name',
      valueExpr: 'id',
      items: this.valueChangeEvents,
      searchEnabled: true,

    };



  }


  showPopup() {

  }


  AddMovement(event) {

    console.log(this.widget.type);

    if (this.widget.type == 1) {

      this.widgets.push({ title: this.widget.title, nbr: 3, sub_title: 'sub Tit', type: this.widget.type, align: 'left' })

    } else if (this.widget.type == 2) {

      this.widgets.push({ title: this.widget.title, nbr1: 33, nbr2: 9, sub_title: 'sub Tit', type: this.widget.type, align: 'left' })

    } else if (this.widget.type == 3) {

      this.widgets.push({ title: this.widget.title, startValue: 0, endValue: 5, tickInterval: 2.5, sub_title: 'sub Tit3', type: this.widget.type, align: 'left' })

    } else if (this.widget.type == 4) {

      this.widgets.push({ title: this.widget.title, table: this.table, type: this.widget.type })

    }



    this.popupVisible = false;
    this.widget = {};
  }

  close(item) {
    const index = this.widgets.indexOf(item);
    this.widgets.splice(index, 1);
  }

  info(item) {
    this.popupInfoVisible = true;

  }

  config(item) {
    this.popupConfigVisible = true;

  }




  table: any[] = [{
    arg: 1950,
    val: 2525778669
  }, {
    arg: 1960,
    val: 3026002942
  }, {
    arg: 1970,
    val: 3691172616
  }, {
    arg: 1980,
    val: 4449048798
  }, {
    arg: 1990,
    val: 5320816667
  }, {
    arg: 2000,
    val: 6127700428
  }, {
    arg: 2010,
    val: 6916183482
  }];



}






