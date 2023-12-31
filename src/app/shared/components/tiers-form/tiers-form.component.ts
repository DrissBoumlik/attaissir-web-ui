import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { locale } from 'devextreme/localization';
import 'devextreme-intl';
import { Third } from '../../classes/third';
import { ThirdsService } from '../../../modules/thirds/services/thirds.service';
import { Helper } from '../../classes/helper';

@Component({
    selector: 'app-tiers-form',
    templateUrl: './tiers-form.component.html',
    styleUrls: ['./tiers-form.component.scss']
})
export class TiersFormComponent implements OnInit {
    @Output() submit: EventEmitter<any> = new EventEmitter();


    @Input() isEdit: boolean;
    @Input() id?: number;
    @Input() type?: string;
    @Input() tier: Third;
    @Input() isAggregated: boolean;
    @Input() isWizard?: boolean;
    @Input() validationGroup?: string;
    @Input() readOnly?: boolean;
    @Input() morale?: boolean;
    @Input() thirdTypeName = 'agrégé';

    buttonOptions: any;
    vars: any;
    banks: any;
    education_degree: any;
    civil_status: any;
    dateOptions: any;
    sexe: any;
    payment_method: any;
    phonePattern: any;
    codeBankPattern: any;
    accountBankPattern: any;
    ribKeyPattern: any;
    cinPattern: any;
    arabicPattern: any;
    locale: string;
    tierData: string;
    cities: any;
    regions: any;
    bank_names: any;
    societe: string;
    helper: any;

    constructor(public thirdsServices: ThirdsService) {
        locale('fr');
        this.helper = Helper;
    }

    ngOnInit() {
        console.log(this.tier);
        this.societe = (this.isAggregated) ? 'Société' : 'Centre de distribution';
        this.thirdsServices.getThirdsVars().subscribe(data => {
            this.vars = data;
            this.banks = Helper.dataSourceformatter(this.vars['banc_names']);

            this.education_degree = {
                dataSource: Helper.dataSourceformatter(this.vars['education_degree']),
                displayExpr: 'Name',
                valueExpr: 'ID',
                // value: Helper.dataSourceformatter(this.vars['education_degree'])[0].ID
            };

            this.civil_status = {
                dataSource: Helper.dataSourceformatter(this.vars['civil_status']),
                displayExpr: 'Name',
                valueExpr: 'ID',
                // value: Helper.dataSourceformatter(this.vars['civil_status'])[0].ID
            };

            this.cities = {
                dataSource: Helper.dataSourceformatter(this.vars['cities']),
                displayExpr: 'Name',
                valueExpr: 'ID',
                searchEnabled: true,
                // value: Helper.dataSourceformatter(this.vars['civil_status'])[0].ID
            };

            this.regions = {
                dataSource: Helper.dataSourceformatter(this.vars['regions']),
                displayExpr: 'Name',
                valueExpr: 'ID',
                searchEnabled: true,
                // value: Helper.dataSourceformatter(this.vars['civil_status'])[0].ID
            };

            this.sexe = {
                dataSource: Helper.dataSourceformatter(this.vars['sexe']).reverse(),
                displayExpr: 'Name',
                valueExpr: 'ID',
            };

            this.bank_names = {
                dataSource: Helper.dataSourceformatter(this.vars['banc_names']),
                displayExpr: 'Name',
                valueExpr: 'ID',
                searchEnabled: true,
            };

            this.payment_method = {
                dataSource: Helper.dataSourceformatter(this.vars['payment_method']),
                layout: 'horizontal',
                displayExpr: 'Name',
                valueExpr: 'ID'
            };


        }, error1 => {
            throw error1;
        });

        this.tierData = 'tierData';
        this.buttonOptions = {
            text: (!this.isEdit) ? 'Ajouter' : 'Modifier',
            type: 'success',
            useSubmitBehavior: true
        };
        this.dateOptions = {
            invalidDateMessage: 'La date doit avoir le format suivant: jj/MM/aaaa',
            calendarOptions: {
                dateSerializationFormat: 'dd/MM/yyyy',
                displayFormat: 'dd/MM/yyyy',
                forceIsoDateParsing: false
            },
            type: 'date',
            max: new Date(),
            onValidated: (e) => {
                if (!e.value) {
                    e.isValid = true;
                }
            },
            width: '100%'
        };
        this.phonePattern = /^0[5|6|7]\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{2}$/;
        this.accountBankPattern = /^\d{16}$/;
        this.codeBankPattern = /^\d{6}$/;
        this.ribKeyPattern = /^\d{6}\s*\d{16}\s*\d{2}$/;
        this.cinPattern = /^[A-Za-z][A-Za-z0-9]{3,9}/;
        this.arabicPattern = /[\u0600-\u06FF]/;
    }

    OnDestroy() {
        delete this.tier;
    }



    /**
     * Update civility value
     * @param e
     */
    onMoraleChanged = (e) => {
        this.tier.type = (this.tier.morale) ? 'morale' : 'physique';
    }



}
