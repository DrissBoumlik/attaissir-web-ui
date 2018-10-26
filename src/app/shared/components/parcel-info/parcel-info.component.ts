import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-parcel-info',
  templateUrl: './parcel-info.component.html',
  styleUrls: ['./parcel-info.component.scss']
})
export class ParcelInfoComponent implements OnInit {

  @Input('ilot') ilot: any;


  constructor() { }

  ngOnInit() {
  }

}
