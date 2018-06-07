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
  @Input() validationGroup?: string;
  @Input() readOnly?: boolean;

  buttonOptions: any;
  education_level: any;
  situation: any;
  dateOptions: any;
  gender: any;
  payment_mode: any;
  phonePattern: any;
  ribPattern: any;
  locale: string;
  tierData: string;

  constructor() {
    locale('fr');
  }

  ngOnInit() {
    this.tierData = 'tierData';
    this.buttonOptions = {
      text: (!this.isEdit) ? 'Ajouter' : 'Modifier',
      type: 'success',
      useSubmitBehavior: true
    };
    this.education_level = {
      dataSource: [
        {
          Name: 'Primaire',
          ID: 'primaire'
        },
        {
          Name: 'Secondaire collège',
          ID: 'secondaire collège'
        },
        {
          Name: 'Secondaire qualifiant',
          ID: 'secondaire qualifiant'
        },
        {
          Name: 'Bachelier',
          ID: 'bachelier'
        },
        {
          Name: 'Enseignement supérieur',
          ID: 'enseignement supérieur'
        },
        {
          Name: 'Sans',
          ID: 'aucun'
        }
      ],
      displayExpr: 'Name',
      valueExpr: 'ID'
    };
    this.situation = {
      dataSource: [
        {
          Name: 'Célibataire',
          ID: 'célibataire'
        },
        {
          Name: 'Marié',
          ID: 'marier'
        },
        {
          Name: 'Divorcé',
          ID: 'divorcer'
        }
      ],
      displayExpr: 'Name',
      valueExpr: 'ID'
    };
    this.gender = {
      items: [
        {
          Name: 'Homme',
          ID: 'm'
        },
        {
          Name: 'Femme',
          ID: 'f'
        }
      ],
      displayExpr: 'Name',
      valueExpr: 'ID'
    };
    this.dateOptions = {
      invalidDateMessage: 'La date doit avoir le format suivant: jj/MM/aaaa',
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
          Name: 'Chèque',
          ID: 'chèque'
        }
      ],
      layout: 'horizontal',
      displayExpr: 'Name',
      valueExpr: 'ID'
    };
    this.phonePattern = /^0[5|6|7]\s*\d{3}\s*\d{5}$/;
    this.ribPattern = /^\d{6}\s*\d{16}\s*\d{2}$/;
  }

  /**
   * Update civility value
   * @param e
   */
  onMoraleChanged = (e) => {
    this.tier.civility = (this.tier.morale) ? 'morale' : 'physique';
  }

}
