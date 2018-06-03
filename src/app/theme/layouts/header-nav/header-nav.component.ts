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
  private pageTitle: string;
  //private route:ActivatedRoute


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pageTitle = 'Dashboard';

  }
  ngOnInit() {
    //console.log(this.route);
  }
  ngAfterViewInit() {

    mLayout.initHeader();

  }

}
