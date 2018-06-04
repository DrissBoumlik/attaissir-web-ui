import { Component, OnInit, Output, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { ActivatedRoute,NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

declare let mLayout: any;
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {


  constructor() {

  }
  ngOnInit() {

  }
  ngAfterViewInit() {

    mLayout.initHeader();

  }

}
