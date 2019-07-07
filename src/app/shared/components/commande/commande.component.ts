import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Third } from '../../classes/third';
import { Helper } from '../../classes/helper';
import { ThirdsService } from '../../../modules/thirds/services/thirds.service';
import { FamilyService } from '../../services/family-service.service';
import { ArticlesService } from '../../../modules/articles/services/articles.service';

@Component({
    selector: 'app-commande-form',
    templateUrl: './commande.component.html',
    styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

    structures: any[];
    regions: any[];
    zones: any[];
    tiers: any[];
    magasin: any[];
    orderDetails: any;
    subFamilies: any;
    currentDate = new Date();


    @Output() submit: EventEmitter<any> = new EventEmitter();


    @Input() isEdit: boolean;
    @Input() id?: number;
    @Input() conseille: Third;
    @Input() isWizard?: boolean;
    @Input() validationGroup?: string;
    @Input() readOnly?: boolean;


    fournisseurs: any;
    families: any;

    buttonOptions: any;

    constructor(private thirdService: ThirdsService,
        private familyService: FamilyService,
        private articleService: ArticlesService) {
    }

    ngOnInit() {
        this.thirdService.getThirdPartiesByType('products_supplier').subscribe(
            (res) => {
                console.log(res);
                this.fournisseurs = {
                    dataSource: res.data,
                    displayExpr: 'Fournisseurs',
                    valueExpr: 'ID',
                    // value: Helper.dataSourceformatter(this.vars['civil_status'])[0].ID
                };
            }
        );

        this.familyService.getFamilies().subscribe(
            (res) => {
                console.log(res);
                this.families = {
                    dataSource: res.data,
                    displayExpr: 'name',
                    valueExpr: 'id',
                    onSelectionChanged: (e) => {
                        this.familyService.getSubFamilies(e.selectedItem.ID).subscribe(
                            (sf: any) => {
                                this.families = {
                                    dataSource: sf.data,
                                    displayExpr: 'name',
                                    valueExpr: 'id',
                                    onSelectionCanged: (ev) => {
                                        this.articleService.getArticlesByFamily(e.selectedItem.ID).subscribe(
                                            (ar: any) => {
                                                this.families = {
                                                    dataSource: ar.data,
                                                    displayExpr: 'name',
                                                    valueExpr: 'id',
                                                };
                                            });
                                    }
                                };
                            });
                    }
                    // value: Helper.dataSourceformatter(this.vars['civil_status'])[0].ID
                };
            }
        );


        this.buttonOptions = {
            text: (!this.isEdit) ? 'Ajouter' : 'Modifier',
            type: 'success',
            useSubmitBehavior: true
        };
    }

    getSousFamilles(event: any) {
        console.log(event);
    }
}
