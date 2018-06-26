import { Component } from '@angular/core';
import {AuthenticationService} from './auth/_services';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

const MINUTES_UNITL_AUTO_LOGOUT = 30;
const CHECK_INTERVAL = 1000;
const STORE_KEY =  'lastAction';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  lastAction: string;

  constructor(private auth: AuthenticationService,
              private _router: Router,
              private toastr: ToastrService) {
    this.reset();
    this.initListener();
    this.initInterval();
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
  }

  reset() {
    localStorage.setItem(STORE_KEY, Date.now().toString());
    this.lastAction = localStorage.getItem(STORE_KEY);
    this.auth.refresh().subscribe(data => {
      console.log('Session Refereshed');
    }, error1 => {
      console.warn(error1);
    });
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
      if (diff < 300000 && diff > 298800) {
        this.toastr.warning('Votre session va expirer dans 5 minute!', '', {
          enableHtml: true,
          tapToDismiss: true
        });
      }

      if (isTimeout) {
        this.auth.logout();
        this._router.navigate(['/login']);
      }
    }
  }

}
