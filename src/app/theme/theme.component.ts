import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../_services/script-loader.service';

import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../auth/_services';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;
const MINUTES_UNITL_AUTO_LOGOUT = 30;
const CHECK_INTERVAL = 1000;
const STORE_KEY = 'lastAction';


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
    this.initInterval();
  }

  initListener() {
    document.body.addEventListener('click', () => {
      if (this.auth.getToken()) {
        console.log('click');
        this.reset();
      }
    });
  }

  reset() {
    localStorage.setItem(STORE_KEY, Date.now().toString());
    this.lastAction = localStorage.getItem(STORE_KEY);
    if (this.canRefresh) {
      this.auth.refresh().subscribe(data => {
        const currentUser: any = JSON.stringify(data);
        localStorage.setItem('currentUser', currentUser);
        localStorage.setItem('token', JSON.parse(currentUser)['data']['token']);
        localStorage.setItem('tenantId', JSON.parse(currentUser)['data']['tenants'][0]['division_id']);
      }, error1 => {
        this.toastr.warning(`La session n'est pas actualisée.`);
      });
    }
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!!currentUser) {
      const now = Date.now();
      const timeleft: any = Number(this.lastAction) + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
      const diff = Number(timeleft) - Number(now);
      const isTimeout = diff < 0;
      this.canRefresh = diff < 600000;

      if (diff < 1500000 && diff > 1499800) {
        this.toastr.warning('Votre session va expirer dans 5 minute!', '', {
          enableHtml: true,
          tapToDismiss: true
        });
      }

      if (isTimeout) {
        // this.auth.logout();
        this._router.navigate(['/login']);
      }
    }
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
