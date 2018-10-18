import { Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
  selector: 'widget1',
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
                  
                  <!--    <a href="#"  (click)="InfoBtn()" class="pull-right">
                              <i class="fa  fa-info-circle" style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                          </a> !-->

                  </div>

          </div>
          
          <div class="row">
                  <div class="col">
                      <p class="nbr"> 
                      {{ nbr }} 
                      </p>	
                      <p class="text"> {{sub_title}}</p>
                      </div>
          </div>
 </div>



 `,

})



export class Widget1Component {


  @Input() id: String;
  @Input() title: String;
  @Input() nbr: String;
  @Input() sub_title: String;

  @Output('close') close: EventEmitter<any> = new EventEmitter<any>();
  @Output('config') config: EventEmitter<any> = new EventEmitter<any>();


  closeBtn() {
    this.close.emit(1);
  }



  ConfigBtn() {
    this.config.emit(this.id);
  }

  @Output('info') info: EventEmitter<any> = new EventEmitter<any>();

  InfoBtn() {
    this.info.emit(1);
  }


}






