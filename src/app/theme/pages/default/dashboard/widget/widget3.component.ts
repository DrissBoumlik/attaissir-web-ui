
import { NgModule, Component, enableProdMode, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaService } from 'ng2-dragula';
declare var $: any;


@Component({
  selector: 'widget3',
  styles: [`


    .ScrollStyle {
      height: 470px;
      width: 100%;
      overflow-y: scroll;
    }

    .widget {
      margin: 5px;
      width: 100%;
      height: 125px;
      border-radius: 5px;
      border-color: #868A93;
      padding: 2px;
      border-style: solid;
      border-width: thin;

      margin-bottom: 30px;

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
    }

    .title {
      color: #868A93;
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
      font-size: 2vw;
      text-align: center;
      padding-top: 3px;
      font-weight: bold;
      color: #fff;

    }

    .text {
      text-align: center;
      font-weight: bold;
      color: #868A93;
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

    ::ng-deep .form {
      padding: 20% 0;
      text-align: center;
    }

    ::ng-deep #progress-button {
      margin-bottom: 20px;
    }

    ::ng-deep .dx-progressbar-container {
      height: 15px;
    }

    ::ng-deep #progress-bar-status {
      display: inline-block;
    }

    ::ng-deep .complete .dx-progressbar-range {
      background-color: green;
    }

    ::ng-deep .dx-progressbar-range {
      position: relative;
      border: 1px solid #383a3b;
      background-color: #495056;
    }

    ::ng-deep .dx-trackbar-container {
      border: 1px solid #000;
    }

    ::ng-deep .dx-progressbar-container {
      border: 1px solid #ffffff;
      background-color: #ffffff;

    }

    ::ng-deep .dx-progressbar-range {
      border: 1px solid #ffffff;
      background-color: #22c324;
    }

    .title a {
      color: #868A93;
    }

    .title a:hover {
      text-decoration: none;
    }
    
    .pourcentage {
      text-align: center;
      color: #fff; 
      font-weight: bold;
      font-size: 20px;
    }


  `],
  template: `
   
  
  <div class="widget">

  <div class="row">
          <div class="col-10">
          <span  class="title">  <a href="#"  (click)="InfoBtn()"
                                    data-toggle="tooltip" title="{{title}}"
                                    (mouseenter)="toggleDefault()"
                                    (mouseleave)="toggleDefault()"
          >	{{title}} </a> </span>
          </div>
              <div class="col-2">
                  
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
                      
               


<div style="margin-top: -6px; display: block; margin-left: auto; margin-right: auto; width: 90%;">
  
  <div class="pourcentage" > {{ ((val/max) * 100).toFixed(2)}} %</div>
                    <dx-progress-bar #progressBar
                                     id="progress-bar-status"
                                     width="90%"
                                     [min]="0"
                                     [max]="max"
                                     [showStatus]="false"
                                     [value]="val"
                    >
                    </dx-progress-bar>
</div> 
                   
                  <div style="text-align: center; color: #c7c7c7;font-weight: bold;">
                  {{val}} {{sub_title}} / {{max}} {{sub_title}}
                  </div>

                  </div>
          </div>
 </div>


  `,

})

export class Widget3Component {

  @Input() id: String;
  @Input() title: String;
  @Input() val: number;
  @Input() val2: number;
  @Input() max: number;
  @Input() sub_title: String;
  @Output('close') close: EventEmitter<any> = new EventEmitter<any>();
  @Output('config') config: EventEmitter<any> = new EventEmitter<any>();
  @Output('info') info: EventEmitter<any> = new EventEmitter<any>();


  defaultVisible = false;
  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
  }


  inProgress = false;
  seconds = 10;
  maxValue = 50;
  intervalId: number;


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

    $(document).ready(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });

  }



}






