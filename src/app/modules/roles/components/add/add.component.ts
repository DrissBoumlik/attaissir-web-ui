import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { NewComponent } from '../../../interventions/components/new/new.component';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
    listOfPermissions = [];
    choosingPermissions = [];
    role: any = {};
    // ui
    buttonOptions: any = {
        text: 'Enregistrer',
        type: 'success',
        useSubmitBehavior: true
    };
    permissions: any;
    router: Router;
    data1 = [];
    count: number;
    checkAll: any;
    permissionsCount: number;
    permissionsSelected: number;
    isChecked: boolean;
    isAll: any;
    checkItem: boolean;

    constructor(public roleService: RolesService, _router: Router) {
        // this.permissions = this.roleService.getPermissions();
        this.router = _router;
        this.permissionsSelected = 0;
        this.isChecked = false;
        this.checkItem = false;
    }

    onFormSubmit(e) {

        console.log(JSON.stringify(this.data1));

        const data = {
            description: this.role.description,
            permission_id: this.data1
        };
        console.log(data);
        this.roleService.saveRole(data).subscribe(
            (response: any) => {
                NewComponent.notifyMe('Role créé avec succès, Redirection.........', 'success');
                // NewComponent.notifyMe(JSON.stringify(response), 'success');
                console.log(JSON.stringify(response));
                this.router.navigate([`/roles/liste`]);


            }, err => {
                console.log(JSON.stringify(err.error.errors));
                Object.keys(err.error.errors).forEach(
                    (e: any) => {
                        NewComponent.notifyMe(err.error.errors[e], 'error');
                    });

            }
        );

    }

    removeItemFromChoosingPermissions(e) {
        const tmp = this.listOfPermissions;
        tmp.push({
            id: e.data.id,
            description: e.data.description
        });
        this.listOfPermissions = tmp;
    }

    addToChoosingPermission(e) {
        this.listOfPermissions = this.listOfPermissions.filter(
            s => {
                return s.id !== e.itemData.id;
            }
        );
        this.choosingPermissions.push({
            id: e.itemData.id,
            description: e.itemData.description
        });

    }

    onChangeValue(i, j) {

        console.log(JSON.stringify(this.permissions[i].permissions[j].id));

        var bool = false;
        var index = -1;
        var k = 0;

        for (k = 0; k < this.data1.length; k++) {
            if (this.data1[k] == this.permissions[i].permissions[j].id) {
                bool = true;
                index = k;
            }
        }
        if (!bool) {
            this.data1.push(this.permissions[i].permissions[j].id);
        } else {
            this.data1.splice(index, 1);
        }

    }

    onSelectAll(i, j) {
        var bool = false;
        var index = -1;
        var k = 0;

        for (k = 0; k < this.data1.length; k++) {
            if (this.data1[k] == this.permissions[i].permissions[j].id) {
                bool = true;
                index = k;
            }
        }
        if (!bool) {
            this.data1.push(this.permissions[i].permissions[j].id);
        } else {
        }
    }
    selectedItems = [];
    selecteLigne(i, id) {
        let hasItem = false;
        let index = -1;
        for (let j = 0; j < this.selectedItems.length; j++) {
            if (this.selectedItems[j] == id) {
                hasItem = true;
                index = j;
            }
        }
        if (hasItem) {
            this.selectedItems.splice(index, 1);
        } else {
            this.selectedItems.push(id);
        }
        console.log("*********");
        console.log(this.selectedItems.length);
        console.log(this.permissionsCount);
        console.log("*********");
        if (this.selectedItems.length == this.permissionsCount) {
            this.checkAll = true;
        } else {
            this.checkAll = false;
        }

        for (let j = 0; j < this.permissions[i].permissions.length; j++) {
            this.onChangeValue(i, j);
        }
        console.log(this.data1);
    }
    selecteAll() {
        if (this.data1.length == 0) {
            console.log('== 0');
            this.isChecked = true;
            // this.checkItem=true;
            this.selectedItems = [];
            let x = 0;
            for (let l = 0; l < this.permissions.length; l++) {
                if (this.permissions[l].permissions.length > 0) {
                    this.selectedItems[x] = this.permissions[l].id;
                    x++;
                }
            }
            console.log("*********");
            console.log(this.selectedItems.length);
            console.log(this.permissionsCount);
            console.log("*********");
            for (let i = 0; i < this.permissions.length; i++) {
                for (let j = 0; j < this.permissions[i].permissions.length; j++) {
                    this.onSelectAll(i, j);
                }
            }

        } else {
            if (this.data1.length < this.count) {
                console.log('<');
                this.data1 = [];
                this.isChecked = true;
                // this.checkItem=true;
                this.selectedItems = [];
                let x = 0;
                for (let l = 0; l < this.permissions.length; l++) {
                    if (this.permissions[l].permissions.length > 0) {
                        this.selectedItems[x] = this.permissions[l].id;
                        x++;
                    }
                }
                console.log("*********");
                console.log(this.selectedItems.length);
                console.log(this.permissionsCount);
                console.log(this.isChecked);
                console.log("*********");
                for (let i = 0; i < this.permissions.length; i++) {
                    for (let j = 0; j < this.permissions[i].permissions.length; j++) {
                        this.onSelectAll(i, j);
                    }
                }
            } else {

                if (this.data1.length == this.count) {
                    this.data1 = [];
                    this.isChecked = false;
                    // this.checkItem=false;
                    this.selectedItems = [];
                    console.log('==');
                    console.log("*********");
                    console.log(this.selectedItems.length);
                    console.log(this.permissionsCount);
                    console.log(this.isChecked);
                    console.log("*********");


                }
            }
        }


        console.log(this.data1);
    }

    ngOnInit() {

        this.roleService.getPermissions().subscribe((data: any) => {
            this.permissions = data.data;
            console.log(data.data);
            this.count = 0;
            this.permissionsCount = 0;
            for (let i = 0; i < this.permissions.length; i++) {
                if (this.permissions[i].permissions.length > 0) {
                    this.permissionsCount++;
                }
                for (let j = 0; j < this.permissions[i].permissions.length; j++) {
                    this.count++;
                }
            }
        }, err => {

        });

        console.log("*********************");
        console.log(JSON.stringify(this.data1));
        console.log("*********************");
    }
}
