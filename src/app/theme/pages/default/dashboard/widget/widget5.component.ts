
import { NgModule, Component, enableProdMode, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaService } from 'ng2-dragula';
declare var $: any;


@Component({
  selector: 'widget5',
  styles: [`




 .ScrollStyle
 {
     height: 470px;
     width: 100%;
     overflow-y: scroll;
 }

 .widget {
     margin : 5px;
     width: 100%;
     height: 125px;
     border-radius: 5px;
     border-color: #868A93;
     padding: 2px;
     border-style: solid;
     border-width: thin;

          margin-bottom: 30px;

 }

 .big-widget{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border-color: #868A93;
  /*  padding: px; */
    border-style: solid;
    border-width: thin;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 10px;
 }

  .title {
     color:#868A93;
     font-weight: bold;
     padding-left: 5px;
     font-size: 0.9vw;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;

     display: block;
     text-overflow: ellipsis;
     word-wrap: break-word;
     overflow: hidden;
 }

 .nbr {
     font-size: 50px;
     text-align: center;
    padding-top: 3px;
     font-weight: bold;
     color : #fff;

 }

 .text {
     text-align: center;
     font-weight: bold;
     color: #868A93;
 }


 ::ng-deep #chart {
     height: 210px;
     width: 100%;
 }

 ::ng-deep #big-chart {
     height: 250px;
     width: 100%;
 }

 ::ng-deep #gauge {
     height: 140px;
     width: 100%;
 }


.title a {
    color:#868A93;
}

 .title a:hover{
    text-decoration: none;
}




 `],
  template: `


  <div class="big-widget">

  <div class="row">
          <div class="col-9">
          <span  class="title">  <a href="#"  (click)="InfoBtn()"
                                    data-toggle="tooltip" title="{{title}}"
                                    (mouseenter)="toggleDefault()"
                                    (mouseleave)="toggleDefault()"
          >	{{title}} </a> </span>
          </div>
              <div class="col-3">

                      <a href="#" (click)="closeBtn()" class="pull-right">
                              <i class="fa fa-times" style="margin: 3px; color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                      </a>
                      <a href="#" (click)="ConfigBtn()"  class="pull-right" >
                      <i class="fa  fa-filter"  style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                  </a>

                   <!--   <a href="#"  (click)="InfoBtn()" class="pull-right">
                              <i class="fa  fa-info-circle" style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                          </a> !-->

                  </div>

          </div>

          <div class="row">
                  <div class="col">

                  









                    <dx-chart id="chart" [dataSource]="table"  >


                      <dxo-tooltip
                        [enabled]="true"
                        [shared]="true"
                        [customizeTooltip]="customizeTooltip">
                      </dxo-tooltip>
                      
                      <dxi-series argumentField="day" valueField="value" type="bar" color="#5ec6ff"></dxi-series>
                      <dxi-value-axis [min]="0" [maxValueMargin]="0.01">
                      </dxi-value-axis>
                      <dxo-legend [visible]="false"></dxo-legend>

                    </dx-chart>



												<!--			<dx-chart

                                                            id="big-chart"
                                                            [dataSource]="table"
                                                    >
                                                            <dxo-legend [visible]="false"></dxo-legend>
                                                            <dxi-series type="bar" color="#989DA3"></dxi-series>
                                                            <dxo-argument-axis [tickInterval]="10">
                                                                    <dxo-label>
                                                                            <dxo-format type="decimal"></dxo-format>
                                                                    </dxo-label>
                                                            </dxo-argument-axis>
                                                    </dx-chart> !-->


                      </div>
          </div>
 </div>


  `,

})

export class Widget5Component {


  @Input() id: String;
  @Input() title: String;
  @Input() table: any[];
  @Input() sub_title: String;
  @Output('close') close: EventEmitter<any> = new EventEmitter<any>();
  @Output('config') config: EventEmitter<any> = new EventEmitter<any>();
  @Output('info') info: EventEmitter<any> = new EventEmitter<any>();


  defaultVisible = false;
  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
  }



  closeBtn() {
    this.close.emit(1);
  }



  ConfigBtn() {
    this.config.emit(this.id);
  }


  InfoBtn() {
    this.info.emit(1);
  }



  ngAfterViewInit() {

    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }

  count(nbr) {

  }







  temperaturesData: any[];
  temperaturesData1: any[];

  constructor() {

    this.temperaturesData1 =


      [{
        day: '1',
        value: 57
      }, {
        day: '2',
        value: 58
      }, {
        day: '3',
        value: 57
      }, {
        day: '4',
        value: 59
      }, {
        day: '5',
        value: 63
      }, {
        day: '6',
        value: 63
      }, {
        day: '7',
        value: 63
      }, {
        day: '8',
        value: 64
      }, {
        day: '9',
        value: 64
      }, {
        day: '10',
        value: 64
      }, {
        day: '11',
        value: 69
      }, {
        day: '12',
        value: 72
      }, {
        day: '13',
        value: 75
      }, {
        day: '14',
        value: 78
      }, {
        day: '15',
        value: 76
      }, {
        day: '16',
        value: 70
      }, {
        day: '17',
        value: 65
      }, {
        day: '18',
        value: 65
      }, {
        day: '19',
        value: 68
      }, {
        day: '20',
        value: 70
      }, {
        day: '21',
        value: 73
      }, {
        day: '22',
        value: 73
      }, {
        day: '23',
        value: 75
      }, {
        day: '24',
        value: 78
      }, {
        day: '25',
        value: 76
      }, {
        day: '26',
        value: 76
      }, {
        day: '27',
        value: 80
      }, {
        day: '28',
        value: 76
      }, {
        day: '29',
        value: 75
      }, {
        day: '30',
        value: 75
      }];
  }



  customizeTooltip = (info: any) => {
    return {
      html: "<p><b>" + info.value + "</b></p>"
    };
  }

}






