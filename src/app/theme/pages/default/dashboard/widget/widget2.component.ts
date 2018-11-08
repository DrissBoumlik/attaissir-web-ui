
import { NgModule, Component, enableProdMode, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaService } from 'ng2-dragula';
declare var $: any;


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

    font-size: 18px;
    text-align: center;
    padding-top: 10px;
    font-weight: bold;
    color: #fff;
    font-family: 'Poppins', sans-serif;

 }

 .text1 {
     text-align: center;
     font-weight: bold;
     color: #ffffff;
     font-size: 16px;
     margin-top: -15px;
   }

 .text2 {
   text-align: center;
   font-weight: bold;
   color: #ffffff;
   font-size: 16px;
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
    color:#868A93;
}

 .title a:hover{
    text-decoration: none;
}

 #count {
   text-align: center;
   margin-top: 12px;

 }

 #_count{
   margin-top: 12px;
   text-align: center;
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

                  <!--       <a href="#"  (click)="InfoBtn()" class="pull-right">
                              <i class="fa  fa-info-circle" style="margin: 3px;color:#868A93; font-size: 12px;" aria-hidden="true"></i>
                          </a> !-->

                  </div>

          </div>

          <div>
                  <div>

<div id="_count">

  <span class=" num nbr timer count-title count-number" attr.data-to="{{nbr1}}" data-speed="1500"></span>
  <span class="text1"> {{sub_title}} </span>
  <span style="  font-weight: bold; color: #fff;"> / </span>
  <span class=" num nbr timer count-title count-number" attr.data-to="{{nbr2}}" data-speed="1500"></span>
  <span class="text2"> {{sub_title}} </span>
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


  defaultVisible = false;
  toggleDefault() {
    this.defaultVisible = !this.defaultVisible;
  }


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



  ngAfterViewInit() {


    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });

    this.count(this.nbr1);



  }



  count(nbr) {


    (function ($: any) {
      $.fn.countTo = function (options) {
        options = options || {};

        return $(this).each(function () {
          // set options for current element
          const settings = $.extend({}, $.fn.countTo.defaults, {
            from:            $(this).data('from'),
            to:              nbr,
            speed:           $(this).data('speed'),
            refreshInterval: $(this).data('refresh-interval'),
            decimals:        $(this).data('decimals')
          }, options);

          // how many times to update the value, and how much to increment the value on each update
          const loops = Math.ceil(settings.speed / settings.refreshInterval),
            increment = (settings.to - settings.from) / loops;

          // references & variables that will change with each update
          let self = this,
            $self = $(this),
            loopCount = 0,
            value = settings.from,
            data = $self.data('countTo') || {};

          $self.data('countTo', data);

          // if an existing interval can be found, clear it first
          if (data.interval) {
            clearInterval(data.interval);
          }
          data.interval = setInterval(updateTimer, settings.refreshInterval);

          // initialize the element with the starting value
          render(value);

          function updateTimer() {
            value += increment;
            loopCount++;

            render(value);

            if (typeof(settings.onUpdate) == 'function') {
              settings.onUpdate.call(self, value);
            }

            if (loopCount >= loops) {
              // remove the interval
              $self.removeData('countTo');
              clearInterval(data.interval);
              value = settings.to;

              if (typeof(settings.onComplete) == 'function') {
                settings.onComplete.call(self, value);
              }
            }
          }

          function render(value) {
            var formattedValue = settings.formatter.call(self, value, settings);
            $self.html(formattedValue);
          }
        });
      };

      $.fn.countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 1000,           // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
      };

      function formatter(value, settings) {
        return value.toFixed(settings.decimals);
      }
    }(jQuery));

    jQuery(function ($) {
      // custom formatting example
      $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });

      // start all the timers
      $('.timer').each(count);

      function count(options) {
        const $this: any = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
      }
    });







  }



}



