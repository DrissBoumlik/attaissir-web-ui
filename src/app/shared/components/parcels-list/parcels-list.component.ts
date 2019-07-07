import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Helper } from '../../classes/helper';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { ToDoService } from '../../services/to-do.service';

@Component({
    selector: 'app-parcels-list',
    templateUrl: './parcels-list.component.html',
    styleUrls: ['./parcels-list.component.scss']
})
export class ParcelsListComponent implements OnInit {
    @Input() data: any;
    @Output() onEditingStart: EventEmitter<any> = new EventEmitter();
    @Output() onRowRemoving: EventEmitter<any> = new EventEmitter();
    @ViewChild('parcelGrid') parcelGrid: DxDataGridComponent;

    helper: any;
    todoValue = 5;
    validerDisabled = true;

    constructor(private router: Router,
        private todoService: ToDoService,
        private toastr: ToastrService) {
        this.helper = Helper;
    }

    ngOnInit() {
    }


    selectTodoParcels() {
        this.parcelGrid.instance.deselectAll();
        const keys = [];
        let cpt = 0;
        while (cpt < this.todoValue) {
            this.parcelGrid.instance.getVisibleRows().forEach((row) => {
                if ((Math.floor(Math.random() * 100) < 20) && this.todoValue > cpt) {
                    if (!keys.includes(row.key)) {
                        keys.push(row.key);
                        cpt++;
                    }
                }
            });
        }
        this.parcelGrid.instance.selectRows(keys, true);
        this.validerDisabled = false;
    }

    validate = () => {
        const parcelIds = [];
        this.parcelGrid.instance.getSelectedRowKeys().forEach(
            (parcel: any) => {
                parcelIds.push(parcel.id);
            }
        );
        this.todoService.addToDos(parcelIds)
            .subscribe(
                (res: any) => {
                    this.toastr.success(res.data);
                    this.parcelGrid.instance.deselectAll();
                    this.validerDisabled = true;
                }
            );
    }

}

