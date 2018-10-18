
import { NgModule, Component, enableProdMode, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaService } from 'ng2-dragula';


@Component({
  selector: 'widget2',
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
    
    font-size: 16px;
    text-align: center;
    padding-top: 10px;
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
                  
                  <!--       <a href="#"  (click)="InfoBtn()" class="pull-right">
                              <i class="fa  fa-info-circle" style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                          </a> !-->

                  </div>

          </div>
          
          <div>
                  <div>
                                     
<div id="count">
<div class="num nbr" style=" margin-top: -20px; margin-left: -30px;">{{ nbr1 }}  {{sub_title}}</div>  
  <div style="    text-align: center; color: #fff; margin-top: -6px;">/</div>
 <div class="num nbr" style="margin-top: -16px; margin-right: -20px;">{{ nbr1 }}  {{sub_title}}</div>
</div>
                       </div>
          </div>
</div>


  `,

})

export class Widget2Component {

  
  @Input() id: String;
  @Input() title: String;
  @Input() nbr1: number;
  @Input() nbr2: number;
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



  ngAfterViewInit(){

    
    $(document).ready(function() {

        var counter = function($this) {
            let maxNum:number = Math.abs(parseInt($this.text()));
          let i:number = 0;
          let repeat:number = maxNum / 50;
      
          setInterval(function() {
      
            $this.text((i += repeat).toFixed(0));
      
            if (i > maxNum) {
                let j:number = maxNum;
              $this.text(parseInt((maxNum).toFixed(0) ));
              return;
            }
      
          }, 40);
        }
      
        $("#count .num").each(function(index, element) {
          counter($(element));
        });
      
      });
  }

}






