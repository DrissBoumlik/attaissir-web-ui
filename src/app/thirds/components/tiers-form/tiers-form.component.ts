import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { locale } from 'devextreme/localization';
import 'devextreme-intl';
import { Third } from '../../classes/third';

@Component({
  selector: 'app-tiers-form',
  templateUrl: './tiers-form.component.html',
  styleUrls: ['./tiers-form.component.scss']
})
export class TiersFormComponent implements OnInit {
  @Output() submit: EventEmitter<any> = new EventEmitter();


  @Input() isEdit: boolean;
  @Input() id?: number;
  @Input() tier: Third;
  @Input() isWizard?: boolean;

  buttonOptions: any;
  education_level: any;
  situation: any;
  dateOptions: any;
  gender: any;
  payment_mode: any;
  phonePattern: any;
  locale: string;

  constructor() {
    locale('fr');
  }

  ngOnInit() {
    this.buttonOptions = {
      text: (!this.isEdit) ? 'Add' : 'Update',
      type: 'success',
      useSubmitBehavior: true
    };
    this.education_level = {
      dataSource: [
        'Primary',
        'Secondary school',
        'Secondary qualifying',
        'High school',
        'Higher education',
        'Illiterate',
      ]
    };
    this.situation = {
      dataSource: [
        'Single',
        'Marry',
        'Divorce'
      ]
    };
    this.gender = {
      dataSource: [
        'Male',
        'Female',
      ]
    };
    this.dateOptions = {
      invalidDateMessage: 'The date must have the following format: dd/MM/yyyy',
      calendarOptions: {
        dateSerializationFormat: 'dd/MM/yyyy',
        displayFormat: 'yyyy-MM-dd',
        forceIsoDateParsing: true
      },
      width: '100%'
    };
    this.payment_mode = {
      dataSource: [
        'Virement',
        'Cheque'
      ],
      layout: 'horizontal'
    };
    this.phonePattern = /^0[5|6|7]\s*\d{4}\s*\d{4}$/;

  }

}
