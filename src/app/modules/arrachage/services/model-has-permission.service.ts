import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
    providedIn: 'root'
})
export class ModelHasPermissionService {

    constructor() {
    }

    static modelHahPermission(appPermissionHidden: any) {
        const permissions_ = localStorage.getItem('permissions');
        if (permissions_) {

            try {
                const bytes = CryptoJS.AES.decrypt(permissions_, 'Gra61884546585_55');
                const permissions_decrypt: any[] = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                if (appPermissionHidden[0] === 'none') {
                    return true;
                }
                return permissions_decrypt.includes(appPermissionHidden[0]);

            } catch (err) {
                return false;
            }
        } else {
            return false;
        }
    }
}
