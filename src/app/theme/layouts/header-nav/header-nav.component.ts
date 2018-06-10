import { Component, OnInit, Output, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

declare let mLayout: any;
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
  currentUser: any;
  displayMenu: boolean;
  tenants: any;
  tenant: string;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUser.data;
  }
  ngOnInit() {
    const data = JSON.parse(localStorage.getItem('currentUser'));
    this.tenants = data.data.tenants;
    this.tenant = localStorage.getItem('tenantId');
  }
  ngAfterViewInit() {
    mLayout.initHeader();
  }

  showMenu = (): void => {
    this.displayMenu = true;
  }

  hideMenu = (): void => {
    this.displayMenu = true;
  }

  changeTenant = (id) => {
    localStorage.setItem('tenantId', id);
  }

}
