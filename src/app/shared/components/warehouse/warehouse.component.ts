import {ZonesService} from '../../../modules/contracts/services/zones.service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Third} from '../../classes/third';
import {Helper} from '../../classes/helper';
import {ThirdsService} from '../../../modules/thirds/services/thirds.service';
import {Toast, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-warehouse-form',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  structures: any[];
  regions: any[];
  zones: any[];
  cda: any[];
  tiers: any;

  helper: any;
  cdasEditorOptions: any;

  @Output() submit: EventEmitter<any> = new EventEmitter();


  @Input() isEdit: boolean;
  @Input() id?: number;
  @Input() validationGroup?: string;
  @Input() readOnly?: boolean;
  @Input() magasin: any;

  buttonOptions: any;

  constructor(private thirdService: ThirdsService, private  zonesService: ZonesService,
              private toastr: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {

    this.buttonOptions = {
      text: (!this.isEdit) ? 'Ajouter' : 'Modifier',
      type: 'success',
      useSubmitBehavior: true
    };


    this.zonesService.getCDAs().subscribe(res => {

      this.cdasEditorOptions = {
        dataSource: res,
        displayExpr: 'name',
        valueExpr: 'id'
      };
    }, error1 => {
      this.toastr.warning(error1.error.message);
    });

    this.thirdService.getThirdsDx().subscribe(
      (res: any) => {
        console.log(res.data);
        this.tiers = {
          dataSource: res.data,
          displayExpr: 'full_name',
          valueExpr: 'ID',
          searchEnabled: true,
          // value: Helper.dataSourceformatter(this.vars['civil_status'])[0].ID
        };
      }
    );

  }

}
