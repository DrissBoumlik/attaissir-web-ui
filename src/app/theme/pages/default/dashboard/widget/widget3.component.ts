
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
     height: 150px;
     border-radius: 5px;
     border-color: #868A93;
     padding: 2px;
     border-style: solid;
     border-width: thin;
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
 }
 
 .nbr {
     font-size: 50px;
     text-align: center;
     padding-top: 20px;
     font-weight: bold;
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
 
 
 
 
 
 `],
  template: `
   
  
  <div class="widget">

  <div class="row">
          <div class="col">
              <span  class="title">	{{title}} </span>
              </div>
              <div class="col">
                  
                      <a href="#" (click)="closeBtn()" class="pull-right">
                              <i class="fa fa-times" style="margin: 3px; color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                      </a>
                      <a href="#" (click)="ConfigBtn()"  class="pull-right" >
                      <i class="fa  fa-cog"  style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                  </a>
                  
                      <a href="#"  (click)="InfoBtn()" class="pull-right">
                              <i class="fa  fa-info-circle" style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                          </a>

                  </div>

          </div>
          
          <div class="row">
                  <div class="col">
                      
                  <dx-linear-gauge id="gauge" [value]="4.3">
                  <dxo-scale
                          [startValue]="startValue"
                          [endValue]="endValue"
                          [tickInterval]="tickInterval"
                          [minorTickInterval]="0.625">
                          <dxo-minor-tick [visible]="true"></dxo-minor-tick>
                  </dxo-scale>
                  <dxo-title >
                          <dxo-font [size]="28"></dxo-font>
                  </dxo-title>
          </dx-linear-gauge>

                      </div>
          </div>
 </div>


  `,

})

export class Widget3Component {


  @Input() title: String;
  @Input() startValue: number;
  @Input() endValue: number;
  @Input() tickInterval: number;


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






