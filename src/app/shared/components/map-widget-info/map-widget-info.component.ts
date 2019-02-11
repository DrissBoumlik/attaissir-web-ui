import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-map-widget-info',
  templateUrl: './map-widget-info.component.html',
  styleUrls: ['./map-widget-info.component.scss']
})
export class MapWidgetInfoComponent implements OnInit {

    @Input('data') data: any;

  constructor() { }

  ngOnInit() {
  }

}
