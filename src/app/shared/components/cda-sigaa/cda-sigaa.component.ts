import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cda-sigaa',
  templateUrl: './cda-sigaa.component.html',
  styleUrls: ['./cda-sigaa.component.scss']
})
export class CdaSigaaComponent implements OnInit {

  @Input('cda') cda: { name: string, polygon: string };

  constructor() { }

  ngOnInit() {
  }

}
