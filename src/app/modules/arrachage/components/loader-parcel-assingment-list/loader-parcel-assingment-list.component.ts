import {Component, OnInit} from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import {ArrachageService} from '../../services/arrachage.service';

@Component({
    selector: 'app-loader-parcel-assingment-list',
    templateUrl: './loader-parcel-assingment-list.component.html',
    styleUrls: ['./loader-parcel-assingment-list.component.scss']
})
export class LoaderParcelAssingmentListComponent implements OnInit {

    loadingVisible = false;
    affectations: any = {};

    constructor(private arrachageService: ArrachageService) {
    }

    ngOnInit() {
        this.loadingVisible = true;
        this.arrachageService.getLoaderParcelAssignments()
            .subscribe(
                (res: any) => {
                    this.affectations = res.data;
                    this.loadingVisible = false;
                }, err => {
                    console.log(err);
                    this.loadingVisible = false;
                }
            );
    }

}
