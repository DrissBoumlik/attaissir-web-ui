import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cda-sigaa',
  templateUrl: './cda-sigaa.component.html',
  styleUrls: ['./cda-sigaa.component.scss']
})
export class CdaSigaaComponent implements OnInit {

  @Input('cda') cda: { name: string, polygon: string };
  @ViewChild('div') div: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.div.nativeElement.innerHTML = this.cda.polygon;
  }

}
