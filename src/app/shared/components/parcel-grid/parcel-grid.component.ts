import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DxDataGridComponent} from 'devextreme-angular';
import {NewComponent} from '../../../modules/interventions/components/new/new.component';

@Component({
  selector: 'app-parcel-grid',
  templateUrl: './parcel-grid.component.html',
  styleUrls: ['./parcel-grid.component.scss']
})
export class ParcelGridComponent implements OnInit {

  @Input('data') data: any;
  @ViewChild('dataGrid') dataGrid: DxDataGridComponent;
  @Output() outData: EventEmitter<any> = new EventEmitter();
  filterButton: any;

  constructor() { }

  ngOnInit() {
  }
  doneClick () {
    if (this.dataGrid.instance.getSelectedRowsData().length === 0 || this.dataGrid.instance.getSelectedRowsData().length > 1) {
      NewComponent.notifyMe('Vous avez sélectionné une seul parcelle.');
      return -1;
    }
    console.log(this.dataGrid.instance.getSelectedRowsData()[0].id);
    this.outData.emit({
      id: this.dataGrid.instance.getSelectedRowsData()[0].id
    });
    this.dataGrid.instance.refresh();
  }

}
