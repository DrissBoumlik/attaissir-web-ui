import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { Helpers } from '../helpers';
import { ToastrService } from 'ngx-toastr';
import { AlertService, AuthenticationService, UserService } from './_services';
import * as CryptoJS from 'crypto-js';
import {AlertComponent} from './_directives/alert.component';

declare let $: any;
declare let mUtil: any;

@Component({
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './templates/login-1.component.html',
  styleUrls: ['./templates/login-1.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class AuthComponent implements OnInit, AfterViewInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage: string;

  @ViewChild('alertSignin',
    { read: ViewContainerRef }) alertSignin: ViewContainerRef;
  @ViewChild('alertSignup',
    { read: ViewContainerRef }) alertSignup: ViewContainerRef;
  @ViewChild('alertForgotPass',
    {read: ViewContainerRef}) alertForgotPass: ViewContainerRef;
  @ViewChild('video') video: ElementRef;

  constructor(private _router: Router,
    private _script: ScriptLoaderService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _authService: AuthenticationService,
    private _alertService: AlertService,
    private cfr: ComponentFactoryResolver,
    private toastr: ToastrService) {

  }

  ngOnInit() {

    window.addEventListener('click', () => {
      this.video.nativeElement.play();
    });

    this.model.remember = true;

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    this._router.navigate([this.returnUrl]);

    this._script.loadScripts('body', [
      'assets/vendors/base/vendors.bundle.js',
      'assets/demo/demo12/base/scripts.bundle.js'], true).then(() => {
        Helpers.setLoading(false);
        this.handleSignInFormSubmit();
      });
    // Set page height
    //document.getElementById('m_login').style.height = (screen.height - 118) + 'px';
    // m-login--signin
  }


  signin() {
    this.loading = true;
    this._authService.login(this.model.email, this.model.password).subscribe(
      data => {
        if (data) {
          const currentUser: any = JSON.stringify(data);
          localStorage.setItem('currentUser', currentUser);
          localStorage.setItem('token', JSON.parse(currentUser)['data']['token']);

          const _data = JSON.stringify(JSON.parse(currentUser)['data']['permissions']);


          const ciphertext = CryptoJS.AES.encrypt(_data, 'Gra61884546585_55');

          localStorage.setItem('permissions', ciphertext);


          localStorage.setItem('tenantId', JSON.parse(currentUser)['data']['tenants'][0]['division_id']);
          this.toastr.success(`Bonjour ${JSON.parse(currentUser).data.name.toUpperCase()}`);

          this._router.navigate([this.returnUrl]);

        }

      },
      error => {
        this.showAlert('alertSignin');
        if (error.error) {
          this.errorMessage = 'Email ou mot de passe incorrect!';
          this._alertService.error('Email ou mot de passe incorrect!');
        }
        this.loading = false;
      });


    this._authService.myPermission().subscribe(response => {


      const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response.data.permissions), 'Gra61884546585_55');
      localStorage.setItem('permissions', ciphertext);


      //      localStorage.setItem('permissions', response.data.permissions);
    },
      error => {
        //  location.reload();
      });
  }

   displaySignUpForm() {
      const login = document.getElementById('m_login');
      mUtil.removeClass(login, 'm-login--forget-password');
      mUtil.removeClass(login, 'm-login--signin');

      mUtil.addClass(login, 'm-login--signup');
      mUtil.animateClass(login.getElementsByClassName('m-login__signup')[0], 'flipInX animated');
    }

  displaySignInForm() {
      const login = document.getElementById('m_login');
      mUtil.removeClass(login, 'm-login--forget-password');
      mUtil.removeClass(login, 'm-login--signup');
      try {
        $('form').data('validator').resetForm();
      } catch (e) {
      }

      mUtil.addClass(login, 'm-login--signin');
      mUtil.animateClass(login.getElementsByClassName('m-login__signin')[0], 'flipInX animated');
    }

  displayForgetPasswordForm() {
      const login = document.getElementById('m_login');
      mUtil.removeClass(login, 'm-login--signin');
      mUtil.removeClass(login, 'm-login--signup');

      mUtil.addClass(login, 'm-login--forget-password');
      mUtil.animateClass(login.getElementsByClassName('m-login__forget-password')[0], 'flipInX animated');
    }


  signup() {
    this.loading = true;
    this._userService.create(this.model).subscribe(
      data => {
        this.showAlert('alertSignin');
        this._alertService.success(
          'Thank you. To complete your registration please check your email.',
          true);
        this.loading = false;
        // this.displaySignInForm();
        this.model = {};
      },
      error => {
        this.showAlert('alertSignup');
        this._alertService.error(error);
        this.loading = false;
      });
  }

  forgotPass() {
    this.loading = true;
    this._userService.forgotPassword(this.model.email).subscribe(
      data => {
        this.showAlert('alertSignin');
        this._alertService.success(
          'Cool! Password recovery instruction has been sent to your email.',
          true);
        this.loading = false;
        // this.displaySignInForm();
        this.model = {};
      },
      error => {
        this.showAlert('alertForgotPass');
        this._alertService.error(error);
        this.loading = false;
      });
  }

  showAlert(target) {
     this[target].clear();
    const factory = this.cfr.resolveComponentFactory(AlertComponent);
    const ref = this[target].createComponent(factory);
    ref.changeDetectorRef.detectChanges();
  }

  handleSignInFormSubmit() {
    $('#m_login_signin_submit').click((e) => {
      const form = $(e.target).closest('form');
      form.validate({
        rules: {
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
          },
        },
      });
      if (!form.valid()) {
        e.preventDefault();
        return;
      }
    });
  }

  ngAfterViewInit() {
    $('.toggle-password').click(function() {

      $(this).toggleClass('fa-eye fa-eye-slash');
      const input = $($(this).attr('toggle'));
      if (input.attr('type') === 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
    });
  }

}
