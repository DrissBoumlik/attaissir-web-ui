import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../_services/script-loader.service';

import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../auth/_services';
import { Observable } from 'rxjs';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;


@Component({
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './theme.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ThemeComponent implements OnInit {
  lastAction: string;
  canRefresh: boolean;

  constructor(private _script: ScriptLoaderService,
    private auth: AuthenticationService,
    private _router: Router,
    private toastr: ToastrService) {
    this.canRefresh = false;
    this.reset();
    this.initListener();
  }

  initListener() {
    Observable.fromEvent(document, 'click').throttleTime(600000)
      .subscribe(ev => {
        if (this.auth.getToken()) {
          this.reset();
        }
      });
  }

  reset() {
    this.auth.refresh().subscribe(data => {
      const currentUser: any = JSON.stringify(data);
      localStorage.setItem('currentUser', currentUser);
      localStorage.setItem('token', JSON.parse(currentUser)['data']['token']);
      localStorage.setItem('permissions', JSON.parse(currentUser)['data']['permissions']);

      // test Tenant
      if (!localStorage.getItem('tenantId')) {
        localStorage.setItem('tenantId', JSON.parse(currentUser)['data']['tenants'][0]['division_id']);
      }
    }, error1 => {
      // this.toastr.warning(`La session n'est pas actualisée.`);
    });
  }

  ngOnInit() {
    this._script.loadScripts('body', ['assets/vendors/base/vendors.bundle.js', 'assets/demo/demo12/base/scripts.bundle.js'], true)
      .then(result => {
        Helpers.setLoading(false);
        // optional js to be loaded once
        this._script.loadScripts('head', ['assets/vendors/custom/fullcalendar/fullcalendar.bundle.js'], true);
      });
    this._router.events.subscribe((route) => {
      if (route instanceof NavigationStart) {
        (<any>mLayout).closeMobileAsideMenuOffcanvas();
        (<any>mLayout).closeMobileHorMenuOffcanvas();
        (<any>mApp).scrollTop();
        Helpers.setLoading(true);
        // hide visible popover
        (<any>$('[data-toggle="m-popover"]')).popover('hide');
      }
      if (route instanceof NavigationEnd) {
        // init required js
        (<any>mApp).init();
        (<any>mUtil).init();
        Helpers.setLoading(false);
        // content m-wrapper animation
        const animation = 'm-animate-fade-in-up';
        $('.m-wrapper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
          $('.m-wrapper').removeClass(animation);
        }).removeClass(animation).addClass(animation);
      }
    });
  }

}
