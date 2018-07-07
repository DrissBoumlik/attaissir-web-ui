import { ZonesService } from '../../../modules/contracts/services/zones.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Helper } from '../../classes/helper';
import { ThirdsService } from '../../../modules/thirds/services/thirds.service';
import { Toast, ToastrService } from 'ngx-toastr';

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
  citys: any;
  phonePattern: any;


  helper: any;
  cdasEditorOptions: any;

  @Output() submit: EventEmitter<any> = new EventEmitter();


  @Input() isEdit: boolean;
  @Input() id?: number;
  @Input() validationGroup?: string;
  @Input() readOnly?: boolean;
  @Input() warehouse: any;

  buttonOptions: any;

  constructor(private thirdService: ThirdsService, private zonesService: ZonesService,
    private toastr: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {

    this.phonePattern = /^0[5|6|7]\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{2}$/;

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


    this.thirdService.getThirdsDx('young_promoter').subscribe(
      (res: any) => {
        console.log(res);
        this.tiers = {
          dataSource: res.data,
          displayExpr: 'full_name',
          valueExpr: 'id',
          searchEnabled: true,
          // value: Helper.dataSourceformatter(this.vars['civil_status'])[0].ID
        };
      }
    );

    this.thirdService.getThirdsVars().subscribe(
      (res: any) => {
        this.citys = {
          dataSource: Helper.dataSourceformatter(res['cities']),
          displayExpr: 'Name',
          valueExpr: 'ID',
          searchEnabled: true,
        };
      });


  }

}
