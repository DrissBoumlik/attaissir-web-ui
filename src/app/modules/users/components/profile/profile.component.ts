import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    user: any;
    userInfo: any;
    buttonsave: any;
    positions: string[];
    role: any;
    structures: any;

    nbr_cdas: any = 0;
    nbr_zones: any = 0;
    nbr_structs: any = 0;


    constructor(
        private userService: UsersService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) {
        this.user = {};
        this.userInfo = {};
    }

    ngOnInit() {


        this.userService.getUserInfo().subscribe(response => {
            this.userInfo = response.data;
            this.structures = response.data.structures;
            this.nbr_structs = response.data.structures_count;
            this.nbr_zones = response.data.zones_count;
            this.nbr_cdas = response.data.cdas_count;

            this.role = response.data.structures.role;



        });

        this.buttonsave = {
            text: 'ENREGISTER',
            type: 'success',
            useSubmitBehavior: true,
            onClick: () => {


                console.log(this.user);


                this.userService.editProfile(this.user).subscribe(
                    result => {
                        console.log(result);

                        this.toastr.success(result.message);
                        this.router.navigate(['/']);
                    },
                    error => {
                        this.toastr.error(error.error.message);
                        // this.errors = error;
                    }
                );




            }
        };

    }




    selectItem($event) {

    }




}
