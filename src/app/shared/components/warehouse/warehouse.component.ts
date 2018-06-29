import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Third } from '../../classes/third';
import { Helper } from '../../classes/helper';
import { ThirdsService } from '../../../modules/thirds/services/thirds.service';

@Component({
  selector: 'app-warehouse-form',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  structures: any[];
  regions: any[];
  zones: any[];
  tiers: any;
  magasin: any[];

  @Output() submit: EventEmitter<any> = new EventEmitter();


  @Input() isEdit: boolean;
  @Input() id?: number;
  @Input() conseille: Third;
  @Input() isWizard?: boolean;
  @Input() validationGroup?: string;
  @Input() readOnly?: boolean;

  buttonOptions: any;
  constructor(private thirdService: ThirdsService) { }

  ngOnInit() {

    this.buttonOptions = {
      text: (!this.isEdit) ? 'Ajouter' : 'Modifier',
      type: 'success',
      useSubmitBehavior: true
    };

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
