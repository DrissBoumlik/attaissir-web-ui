
import { NgModule, Component, enableProdMode, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaService } from 'ng2-dragula';


@Component({
  selector: 'widget3',
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
     margin : 5px;
     width: 100%;
     height: 336px;
     border-radius: 5px;
     border-color: #868A93;
     padding: 2px;
     border-style: solid;
     border-width: thin;
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
    font-size: 2vw;
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



::ng-deep  .dx-progressbar-range {
    position: relative;
    border: 1px solid #383a3b;
    background-color: #495056;
}
 

.title a {
    color:#868A93;
}

 .title a:hover{
    text-decoration: none;
}
 
 
 `],
  template: `
   
  
  <div class="widget">

  <div class="row">
          <div class="col-10">
          <span  class="title">  <a href="#"  (click)="InfoBtn()">	{{title}} </a> </span>
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
                      
                  <dx-progress-bar #progressBar style="margin-top: 50px;
                   margin-left: 7px;"
                  id="progress-bar-status"
                   width="90%"
                  [class.complete]="progressBar.value == maxValue"
                  [min]="0"
                  [max]="maxValue"
                  [statusFormat]="format"
                  [value]="maxValue - seconds">
              </dx-progress-bar>

                      </div>
          </div>
 </div>


  `,

})

export class Widget3Component {


  @Input() id: String;
  @Input() title: String;
  @Input() startValue: number;
  @Input() endValue: number;
  @Input() tickInterval: number;


  inProgress = false;
  seconds = 10;
  maxValue = 50;
  intervalId: number;

  @Output('close') close: EventEmitter<any> = new EventEmitter<any>();

  closeBtn() {
    this.close.emit(1);
  }


  @Output('config') config: EventEmitter<any> = new EventEmitter<any>();

  ConfigBtn() {
    this.config.emit(this.id);
  }

  @Output('info') info: EventEmitter<any> = new EventEmitter<any>();

  InfoBtn() {
    this.info.emit(1);
  }

  format(value) {
    return 'Loading: ' + value * 100 + '%';
  }

}






