import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { InterventionService } from '../../services/intervention.service';
import notify from 'devextreme/ui/notify';
import { CardsService } from '../../../cards/services/cards.service';
import { Helper } from '../../../../shared/classes/helper';
@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
    loadingVisible = true;
    step = 0;
    family: any;
    sub_family: any;
    farmerData: any;
    data: any = {};
    public types = [];
    colCountByScreen: Object;

    constructor(private router: Router,
        private cardService: CardsService,
        private thirdService: ThirdsService,
        private interventionService: InterventionService) {
        this.colCountByScreen = {
            md: 4,
            sm: 1
        };
    }

    static notifyMe(message: string, type = 'warning', duration = 1200) {
        return notify(
            {
                position: { my: 'center', at: 'center', of: window },
                shading: true,
                shadingColor: 'rgba(0,0,0,0.4)',
                width: '30%',
                message: message,
            },
            type,
            duration
        );
    }

    screen(width) {
        return width < 720 ? 'sm' : 'md';
    }

    ngOnInit() {
        const structureId = localStorage.getItem('tenantId');
        this.interventionService.getFamiliesAndSubFamilies(+structureId).subscribe(
            (res: any) => {
                this.loadingVisible = false;
                res.data.forEach((activity_family: any, index) => {
                    const acfa = {
                        type_name: activity_family.activity_family,
                        type_id: index,
                        families: []
                    };
                    activity_family.interventions.forEach((intervention: any) => {
                        const inter = {
                            family_id: intervention.id,
                            family_name: intervention.name,
                            sub_families: []
                        };
                        intervention.sub_interventions.forEach((sub_intervention: any) => {
                            const sub_inter = {
                                sub_family_id: sub_intervention.id,
                                sub_family_name: sub_intervention.name
                            };
                            inter.sub_families.push(sub_inter);
                        });
                        acfa.families.push(inter);
                    });
                    this.types.push(acfa);
                });
            }
        );
    }

    selectFamily(type_id: number, family_id: number) {
        this.family = this.types.find(type => {
            return type.type_id === type_id;
        }).families.find(family => {
            return family.family_id === family_id;
        });
        if (this.family) {
            this.step = 1;
        }
    }

    selectSubFamily(id: number) {
        this.sub_family = this.family.sub_families.find(sub_family => {
            return sub_family.sub_family_id === id;
        });
        if (this.sub_family) {
            this.step = 2;
        }
    }

    goBack() {
        this.step -= 1;
    }

    readRFID(e: any) {
        this.farmerData = e;
        if (this.farmerData.rfid) {

            this.farmerData.rfid = this.farmerData.rfid.replace(/à/g, '0');
            this.farmerData.rfid = this.farmerData.rfid.replace(/&/g, '1');
            this.farmerData.rfid = this.farmerData.rfid.replace(/é/g, '2');
            this.farmerData.rfid = this.farmerData.rfid.replace('"', '3');
            this.farmerData.rfid = this.farmerData.rfid.replace('\'', '4');
            this.farmerData.rfid = this.farmerData.rfid.replace('(', '5');
            this.farmerData.rfid = this.farmerData.rfid.replace('-', '6');
            this.farmerData.rfid = this.farmerData.rfid.replace(/è/g, '7');
            this.farmerData.rfid = this.farmerData.rfid.replace('_', '8');
            this.farmerData.rfid = this.farmerData.rfid.replace(/ç/g, '9');

            this.validate();
        }
    }

    validate() {
        this.data.family_id = this.family.family_id;
        this.data.sub_family_id = this.sub_family.sub_family_id;

        this.loadingVisible = true;


        /**
         * First check if the user has entered either a 'CIN' or has swiped the card
         * if not then return a warning message and stay in the current page.
         */
        if (!this.farmerData) {
            NewComponent.notifyMe('Prière d\'entrer un cin ou bien faire glisser la carte.');
            this.loadingVisible = false;
            return;
        }

        /**
         * If the user has entered a 'CIN' it must be verified
         */
        if (this.farmerData && !this.farmerData.rfid && this.farmerData.cin) {
            this.interventionService.getThirdByCIN(this.farmerData.cin).subscribe(
                (res: any) => {
                    this.loadingVisible = false;
                    if (res.data.length === 0) {
                        NewComponent.notifyMe('Le CIN que vous avez saisi est incorrect ou la agriculteur est desactivée.');
                        return;
                    } else {
                        this.data.third_party_id = res.data.id;
                        this.router.navigate(['/interventions/ajouter'],
                            {
                                queryParams: {
                                    family_id: this.data.family_id,
                                    sub_family_id: this.data.sub_family_id,
                                    third_party_id: this.data.third_party_id
                                }
                            });
                    }
                },
                (err) => {
                    this.loadingVisible = false;
                    NewComponent.notifyMe('Le CIN que vous avez saisi est incorrect ou la agriculteur est desactivée.');
                    return;
                });
        }

        if (this.farmerData && this.farmerData.rfid) {
            this.cardService.getCardByRFID(this.farmerData.rfid).subscribe(
                (res: any) => {
                    this.loadingVisible = false;
                    if (res.data.length === 0) {
                        NewComponent.notifyMe('La carte est inactive ou corrompue.');
                        return;
                    } else {
                        this.data.third_party_id = res.data.third_party_id;
                        this.router.navigate(['/interventions/ajouter'],
                            {
                                queryParams: {
                                    family_id: this.data.family_id,
                                    sub_family_id: this.data.sub_family_id,
                                    third_party_id: this.data.third_party_id
                                }
                            });
                    }
                });
        }
    }


}
