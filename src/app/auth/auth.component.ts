import {
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { Helpers } from '../helpers';
import { ToastrService } from 'ngx-toastr';
import { AlertService, AuthenticationService, UserService } from './_services';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './templates/login-1.component.html',
    styleUrls: ['./templates/login-1.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class AuthComponent implements OnInit {
    model: any = {};
    returnUrl: string;
    errorMessage: string;
    loadingVisible = false;

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
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        this._router.navigate([this.returnUrl]);
    }


    signin() {
        this.loadingVisible = true;
        this._authService.login(this.model.email, this.model.password).subscribe(
            data => {
                this.loadingVisible = false;
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
                this.loadingVisible = false;
                this.toastr.error('Email ou mot de passe incorrect!');
                if (error.error) {
                    this.errorMessage = 'Email ou mot de passe incorrect!';
                    this._alertService.error('Email ou mot de passe incorrect!');
                }
            });

        this._authService.myPermission().subscribe(response => {
            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response.data.permissions), 'Gra61884546585_55');
            localStorage.setItem('permissions', ciphertext);
        },
            error => {
                console.log(error);
            });
    }


}
