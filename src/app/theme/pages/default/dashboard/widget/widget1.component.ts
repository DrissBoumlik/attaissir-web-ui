import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'widget1',
  styles: [`




    .ScrollStyle {
      height: 470px;
      width: 100%;
      overflow-y: scroll;
    }

    .widget {
      margin-top: 5px;
      margin-bottom: 5px;
      padding-top: 2px;
      padding-bottom: 2px;
      color: #989da3;
      width: 100%;
      height: 150px;
      border-radius: 5px;
      border-color: #868A93;
      border-style: solid;
      border-width: thin;
      background: #00a7e7;
      background: -moz-radial-gradient(circle, #49a6e3, #358fd2, #2478c1, #1961af, #144b9b);
      background: -webkit-radial-gradient(circle, #49a6e3, #358fd2, #2478c1, #1961af, #144b9b);
      background: radial-gradient(circle, #49a6e3, #358fd2, #2478c1, #1961af, #144b9b);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00a7e7', endColorstr='#104ba0', GradientType=1);
      border: 1px solid #00a7e7;
    }

    .big-widget {
      margin: 5px;
      width: 100%;
      height: 336px;
      border-radius: 5px;
      border-color: #868A93;
      padding: 2px;
      border-style: solid;
      border-width: thin;
      color: #989da3;
      width: 100%;
      height: 150px;
      border-radius: 5px;
      border-color: #868A93;
      border-style: solid;
      border-width: thin;
      background: #00a7e7;
      background: -moz-radial-gradient(circle, #49a6e3, #358fd2, #2478c1, #1961af, #144b9b);
      background: -webkit-radial-gradient(circle, #49a6e3, #358fd2, #2478c1, #1961af, #144b9b);
      background: radial-gradient(circle, #49a6e3, #358fd2, #2478c1, #1961af, #144b9b);
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00a7e7', endColorstr='#104ba0', GradientType=1);
      border: 1px solid #00a7e7;
    }

    .title {
      color: #ff9f11;
      font-weight: bold;
      padding-left: 5px;
    }

    .nbr {
      font-size: 50px;
      text-align: center;
      padding-top: 20px;
      font-weight: bold;
      color: white;
    }

    .text {
      text-align: center;
      font-weight: bold;
      color: #f6fbff;
    }

    ::ng-deep #chart {
      height: 110px;
      width: 200px;
    }

    ::ng-deep #big-chart {
      height: 310px;
      width: 100%;
    }

    ::ng-deep #gauge {
      height: 140px;
      width: 100%;
    }





  `],
  template: `


    <div class="widget">

      <div class="row">
        <div class="col">
          <span class="title">	{{title}} </span>
        </div>
        <div class="col">

          <a href="#" (click)="closeBtn()" class="pull-right">
            <i class="fa fa-times" style="margin: 3px; color:#868A93; font-size: 12px;" aria-hidden="true"></i>
          </a>
          <a href="#" (click)="ConfigBtn()" class="pull-right">
            <i class="fa  fa-cog" style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
          </a>

          <a href="#" (click)="InfoBtn()" class="pull-right">
            <i class="fa  fa-info-circle" style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
          </a>

        </div>

      </div>

      <div class="row">
        <div class="col">
          <p class="nbr"> {{nbr}}</p>
          <p class="text"> {{sub_title}}</p>
        </div>
      </div>
    </div>


  `,

})

export class Widget1Component {


  @Input() title: String;
  @Input() nbr: String;
  @Input() sub_title: String;

  @Output('close') close: EventEmitter<any> = new EventEmitter<any>();

  closeBtn() {
    this.close.emit(1);
  }


  @Output('config') config: EventEmitter<any> = new EventEmitter<any>();

  ConfigBtn() {
    this.config.emit(1);
  }

  @Output('info') info: EventEmitter<any> = new EventEmitter<any>();

  InfoBtn() {
    this.info.emit(1);
  }


}






