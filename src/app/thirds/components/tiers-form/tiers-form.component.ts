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
  ribPattern: any;
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
        {
          Name: 'Primary',
          ID: 'primaire'
        },
        {
          Name: 'Secondary school',
          ID: 'secondaire_college'
        },
        {
          Name: 'Secondary qualifying',
          ID: 'secondaire_qualifiant'
        },
        {
          Name: 'High school',
          ID: 'bachelier'
        },
        {
          Name: 'Higher education',
          ID: 'enseignement_superieur'
        },
        {
          Name: 'Illiterate',
          ID: 'ignorant'
        }
      ],
      displayExpr: 'Name',
      valueExpr: 'ID'
    };
    this.situation = {
      dataSource: [
        {
          Name: 'Single',
          ID: 'celibataire'
        },
        {
          Name: 'Marry',
          ID: 'marier'
        },
        {
          Name: 'Divorce',
          ID: 'divorcer'
        }
      ],
      displayExpr: 'Name',
      valueExpr: 'ID'
    };
    this.gender = {
      items: [
        {
          Name: 'Male',
          ID: 'm'
        },
        {
          Name: 'Female',
          ID: 'f'
        }
      ],
      displayExpr: 'Name',
      valueExpr: 'ID'
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
        {
          Name: 'Virement',
          ID: 'virement'
        },
        {
          Name: 'Cheque',
          ID: 'cheque'
        }
      ],
      layout: 'horizontal',
      displayExpr: 'Name',
      valueExpr: 'ID'
    };
    this.phonePattern = /^0[5|6|7]\s*\d{4}\s*\d{4}$/;
    this.ribPattern = /^\d{5}\s*\d{5}\s*\d{12}\s*\d{2}$/;
  }

  /**
   * Update civility value
   * @param e
   */
  onMoraleChanged = (e) => {
    this.tier.civility = (this.tier.morale) ? 'morale' : 'physique';
  }

}
