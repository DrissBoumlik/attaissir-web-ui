
import { Component, EventEmitter, Input, Output } from '@angular/core';

declare var $: any



@Component({
  selector: 'widget1',
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

      color: #fff;
      font-family: 'Poppins', sans-serif;

    }

    .text {
      text-align: center;
      font-weight: bold;
      color: #ffffff;
      font-size: 22px;
      margin-top: -15px;
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

    .title a {
      color: #868A93;
    }

    .title a:hover {
      text-decoration: none;
    }

    #count {
      text-align: center;
    }

 
  `],
  template: `
 

  <div class="widget"     >

  <div class="row">
          <div class="col-10">
              <span  class="title">  <a href="#"  (click)="InfoBtn()"
                                         data-toggle="tooltip" title="{{title}}"
                                        (mouseenter)="toggleDefault()"
                                        (mouseleave)="toggleDefault()" >	{{title}} </a> </span>
              </div>
              <div class="col-2">

                      <a href="#" (click)="closeBtn()" class="pull-right">
                              <i class="fa fa-times" style="margin: 3px; color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                      </a>
                      <a href="#" (click)="ConfigBtn()"  class="pull-right" >
                      <i class="fa  fa-filter"  style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                  </a>

                  <!--    <a href="#"  (click)="InfoBtn()" class="pull-right">
                              <i class="fa  fa-info-circle" style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                          </a> !-->

                  </div>

          </div>

          <div class="row">
                  <div class="col">


<div id="count">

  

   <span class="num nbr">{{ nbr }}</span>
  <!--
     <span *ngIf="_nbr == 0" class="nbr" counter-up offset="50" delay="100" time="10" [number]="nbr" (complete)="log($event)" >0</span>
    <span *ngIf="_nbr != 0" class="nbr"   >{{_nbr}}</span>
   !-->
  
  <span class="text"> {{sub_title}}</span>


</div>

                       </div>
          </div>
 </div>

 
 `,

})



export class Widget1Component {


  @Output('info') info: EventEmitter<any> = new EventEmitter<any>();
  @Output('close') close: EventEmitter<any> = new EventEmitter<any>();
  @Output('config') config: EventEmitter<any> = new EventEmitter<any>();

  @Input() id: String;
  @Input() title: String;
  @Input() nbr: number;
  @Input() _nbr = 0;
  @Input() sub_title: String;



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


  log(event) {
    console.log('event');
    console.log(this.nbr);
    this._nbr = this.nbr;
  }


}

