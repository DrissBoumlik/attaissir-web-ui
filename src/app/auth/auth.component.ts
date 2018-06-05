import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/user.service';
import { AlertComponent } from './_directives/alert.component';
import { Helpers } from '../helpers';

declare let $: any;
declare let mUtil: any;

@Component({
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './templates/login-1.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class AuthComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  @ViewChild('alertSignin',
    { read: ViewContainerRef }) alertSignin: ViewContainerRef;
  @ViewChild('alertSignup',
    { read: ViewContainerRef }) alertSignup: ViewContainerRef;
  @ViewChild('alertForgotPass',
    { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;

  constructor(
    private _router: Router,
    private _script: ScriptLoaderService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _authService: AuthenticationService,
    private _alertService: AlertService,
    private cfr: ComponentFactoryResolver) {
  }

  ngOnInit() {
    this.model.remember = true;
    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._router.navigate([this.returnUrl]);

    this._script.loadScripts('body', [
      'assets/vendors/base/vendors.bundle.js',
      'assets/demo/demo12/base/scripts.bundle.js'], true).then(() => {
        Helpers.setLoading(false);
      });
    // Set page height
    document.getElementById('m_login').style.height = (screen.height - 118) + "px";
    // m-login--signin
  }

  signin() {
    this.loading = true;
    this._authService.login(this.model.email, this.model.password).subscribe(
      data => {
        if (data['token']) {
          localStorage.setItem('currentUser', JSON.stringify(data));
        }
        this._router.navigate([this.returnUrl]);
      },
      error => {
        this.showAlert('alertSignin');
        if (error.error) {
          this._alertService.error(error.error.error);
        }
        this.loading = false;
      });
  }


  showAlert(target) {
    this[target].clear();
    let factory = this.cfr.resolveComponentFactory(AlertComponent);
    let ref = this[target].createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }

}
