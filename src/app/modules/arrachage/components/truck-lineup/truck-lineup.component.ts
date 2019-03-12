import { Component, OnInit } from '@angular/core';
import { GpsService } from '../../../../shared/services/gps.service';

@Component({
    selector: 'app-truck-lineup',
    templateUrl: './truck-lineup.component.html',
    styleUrls: ['./truck-lineup.component.scss']
})
export class TruckLineupComponent implements OnInit {
    encoded: any = [];
    last_rotation: any = [];
    not_encoded: any = [];
    loadingVisible = false;
    constructor(private gpsService: GpsService) {
    }

    ngOnInit() {
        this.loadingVisible = true;
        this.gpsService.getLineupData()
            .subscribe(
                (res: any) => {
                    this.loadingVisible = false;
                    this.encoded = res.data.encoded;
                    this.not_encoded = res.data.not_encoded;
                    this.last_rotation = res.data.last_rotation;
                }, (err => {
                    this.loadingVisible = false;
                    throw err;
                })
            );
        setInterval(() => {
            this.gpsService.getLineupData()
                .subscribe(
                    (res: any) => {
                        this.encoded = res.data.encoded;
                        this.not_encoded = res.data.not_encoded;
                        this.last_rotation = res.data.last_rotation;
                    }, (err => {
                        throw err;
                    })
                );
        }, 180000);
    }


}
