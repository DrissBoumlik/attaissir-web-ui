
import { fromEvent as observableFromEvent, Observable } from 'rxjs';

import { throttleTime } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from '../helpers';
import { ScriptLoaderService } from '../_services/script-loader.service';

import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../auth/_services';

declare let mApp: any;
declare let mUtil: any;
declare let mLayout: any;

import * as CryptoJS from 'crypto-js';


@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ThemeComponent implements OnInit {
    lastAction: string;
    canRefresh: boolean;
    demoCollapsed = false;
    routes = [];
    currentUser: any = {};
    tenants: any;
    tenant: number;

    constructor(private _script: ScriptLoaderService,
        private auth: AuthenticationService,
        private _router: Router) {
        this.canRefresh = false;
        this.reset();
        this.initListener();
        this.routes = [
            {
                name: 'Tableau de bord',
                permission: ['reporting.contracts.store'],
                icon: 'axis-chartopen',
                url: '/index',
                description: '',
                disabled: 'false'
            },
            {
                name: 'Contractualisation',
                permission: ['agreement.contracts.grid'],
                icon: 'note',
                url: '/contrats/liste',
                description: '',
                subMenu: [
                    {
                        icon: 'add-text',
                        name: 'Nouveau contrat',
                        url: '/contrats/ajouter',
                        permission: ['agreement.contracts.store'],
                    },
                    {
                        icon: 'file-group',
                        name: 'Liste des contrats',
                        url: '/contrats/liste',
                        permission: ['agreement.contracts.grid'],
                    },
                    /*{
                      icon: 'flaticon-list',
                      name: 'Contrats actifs',
                      url: '/contrats/liste/courant',
                      permission: ['agreement.contracts.grid'],
                    },*/
                    {
                        icon: 'list',
                        name: 'Liste des parcelles',
                        url: '/parcelles/liste',
                        permission: ['agreement.parcels.grid'],
                    },
                    {
                        icon: 'view-list',
                        name: 'Liste des agrégé',
                        url: '/tiers/liste',
                        permission: ['agreement.parcels.grid'],
                    }
                ],
                disabled: 'false'
            },
            {
                name: 'CARTES RFID',
                permission: ['agreement.cards.show'],
                icon: 'view-cards',
                url: '/reporting/cards',
                description: '',
                subMenu: [
                    {
                        icon: 'view-cards',
                        name: 'Liste des cartes RFID',
                        url: '/reporting/cards',
                        permission: ['agreement.cards.show']
                    },
                    {
                        icon: 'collapse-card',
                        name: 'Générateur de carte',
                        url: '/carte-generateur/index',
                        permission: ['agreement.cards.store']
                    }
                ],
                disabled: 'false'
            },
            {
                name: 'PRECONISATIONS',
                icon: 'bundle',
                permission: ['preconization.interventions.grid'],
                url: '/preconisations-intrants/liste',
                description: '',
                subMenu: [
                    {
                        icon: 'plus-circle',
                        name: 'Préconisation individuelle',
                        url: '/interventions/selectionner',
                        permission: ['preconization.interventions.store']
                    },
                    {
                        icon: 'details',
                        name: 'Liste des préconisations des intrants',
                        url: '/preconisations-intrants/liste',
                        permission: ['preconization.articletemplates.grid']
                    }
                ],
                disabled: 'false'
            },
            {
                name: 'Centres de distribution',
                permission: ['distributionCenter.warehouses.grid'],
                icon: 'users',
                url: '/jeunepromoteurs/liste',
                description: '',
                subMenu: [
                    {
                        icon: 'users',
                        name: 'Liste des Centre de distribution',
                        url: '/jeunepromoteurs/liste',
                        permission: ['distributionCenter.warehouses.grid']
                    },
                ],
                disabled: 'false'
            },
            {
                name: 'SYNTHÈSE DE STOCK',
                icon: 'bundle',
                permission: ['distributionCenter.stocks.grid'],
                url: '/stock/situation',
                description: '',
                subMenu: [
                    {
                        icon: 'bundle',
                        name: 'Situation de stock',
                        url: '/stock/situation',
                        permission: ['distributionCenter.stocks.grid']
                    },
                    {
                        icon: 'repeat',
                        name: 'Approvisionnement de stock',
                        url: '/stock/reappro',
                        permission: ['distributionCenter.stocks.reapprovisionnement']
                    },
                    {
                        name: 'Liste des mouvements',
                        icon: 'cursor-move',
                        url: '/mouvements',
                        description: 'Liste des mouvements',
                        disabled: 'false',
                        permission: ['distributionCenter.stocks.grid']
                    },
                    {
                        name: 'Liste des demandes d\'achat',
                        icon: 'container',
                        url: '/demandes',
                        description: 'Centre de distrubition',
                        disabled: 'false',
                        permission: ['distributionCenter.orders.grid']
                    },
                    {
                        icon: 'box-plot',
                        name: 'Liste des articles',
                        url: '/articles/liste',
                        permission: ['distributionCenter.articlecategories.grid']
                    },

                ],
                disabled: 'false'
            },
            {
                name: 'AVANCES & PRIMES',
                icon: 'wallet',
                permission: ['preconization.interventions.avance_prime'],
                url: '/preconisations-intrants/avance-primes',
                description: '',
                subMenu: [
                    {
                        icon: 'dollar',
                        name: 'Avances et primes (agriculteur)',
                        url: '/preconisations-intrants/avance-primes',
                        permission: ['preconization.interventions.avance_prime']
                    },
                    {
                        icon: 'euro',
                        name: 'Avances et primes (préstataires)',
                        url: '/preconisations-intrants/avance-prest',
                        queryParams: {
                            prestataires: true
                        },
                        permission: ['preconization.interventions.avance_prime']
                    },
                ]
            },
            {
                name: 'SUIVI CULTURAL',
                permission: ['preconization.interventions.store'],
                icon: 'eye',
                url: '/incidents/liste',
                description: '',
                subMenu: [
                    {
                        icon: 'list',
                        name: 'Liste des incidents',
                        hasBadge: true,
                        url: '/incidents/liste',
                        permission: ['preconization.interventions.store'],
                    },
                    {
                        icon: 'clipboard',
                        name: 'Etat de la culture',
                        hasBadge: true,
                        url: '/fieldstates/liste',
                        permission: ['preconization.interventions.store'],
                    },
                    {
                        icon: 'bubble-chart',
                        hasBadge: true,
                        name: 'Parcelles observatoires',
                        url: '/incidents/todos',
                        permission: ['parcel.diagnose.activate'],
                    },
                    {
                        name: 'Suivi cultural',
                        hasBadge: true,
                        permission: ['preconization.interventions.store'],
                        icon: 'map-marker',
                        url: '/carte/suivi',
                        disabled: 'false'
                    }
                ],
                disabled: 'false'
            },
            {
                name: 'GESTION DE LA RECOLTE',
                icon: 'truck',
                permission: ['preconization.interventions.store'],
                url: '/arrachage/echantillons',
                description: '',
                subMenu: [
                    {
                        icon: 'filter-grid-circle',
                        name: 'Echantillonnage',
                        url: '/arrachage/echantillons',
                        permission: ['preconization.interventions.store']
                    },
                    {
                        icon: 'number-list',
                        name: 'Ordre de récolte',
                        url: '/arrachage/ordre',
                        permission: ['convocations.order.view']
                    },
                    {
                        icon: 'envelope',
                        name: 'Convocations de récoltes',
                        url: '/arrachage/convocations',
                        hasBadge: true,
                        permission: ['convocations.generate.view']
                    },
                    {
                        icon: 'replay-one',
                        name: 'Rotations de récolte',
                        url: '/arrachage/convocations/generated',
                        permission: ['convocations.rotations.view']
                    },
                    {
                        icon: 'truck',
                        name: 'File d\'attente',
                        url: '/arrachage/truck/lineup',
                        permission: ['convocations.rotations.queue']
                    }
                ]
            },
            {
                name: 'Reporting',
                permission: ['reporting.contracts.grid'],
                icon: 'folder-open',
                url: '/reporting',
                description: '',
                disabled: 'false'
            },
            {
                name: 'GESTION DES UTILISATEURS',
                permission: ['import.import.index'],
                icon: 'cog',
                url: '/import/index',
                description: '',
                subMenu: [
                    { icon: 'plus', name: 'Nouveau role', url: '/roles/ajouter', permission: ['user.roles.store'] },
                    { icon: 'checkbox-list', name: 'Liste des roles', url: '/roles/liste', permission: ['user.roles.grid'] },
                    { icon: 'users', name: 'Liste des utilisateurs', url: '/utilisateurs/liste', permission: ['user.users.index'] },
                    { icon: 'eye-hide', name: 'Journal d\'activités', url: '/activity/index', permission: ['user.users.index'] },
                    { icon: 'upload-cloud', name: 'Import', url: '/import/index', permission: ['import.import.index'] },
                ],
                disabled: 'false'
            }
        ];
    }

    initListener() {
        observableFromEvent(document, 'click').pipe(throttleTime(600000))
            .subscribe(ev => {
                if (this.auth.getToken()) {
                    this.reset();
                }
            });
    }


    reset() {
        this.auth.refresh().subscribe((data: any) => {
            const currentUser: any = JSON.stringify(data);
            console.log(data);
            this.currentUser = data.data;
            this.tenants = this.currentUser.tenants;
            localStorage.setItem('currentUser', currentUser);
            localStorage.setItem('token', JSON.parse(currentUser)['data']['token']);
            // test Tenant
            if (!localStorage.getItem('tenantId')) {
                localStorage.setItem('tenantId', JSON.parse(currentUser)['data']['tenants'][0]['division_id']);
            }
        }, err => {
            console.log(err);
        });
    }

    ngOnInit() {
        if (localStorage.getItem('tenantId')) {
            this.tenant = +localStorage.getItem('tenantId');
        }
        this.auth.myPermission().subscribe(response => {
            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response.data.permissions), 'Gra61884546585_55');
            localStorage.setItem('permissions', ciphertext);
        });
    }

    changeTenant = (id) => {
        localStorage.setItem('tenantId', id);
        this.tenant = +id;
        location.reload();
    }
}
