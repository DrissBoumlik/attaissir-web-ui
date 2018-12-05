import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicService } from '../../../services/dynamic.service';

declare let mLayout: any;

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {
  public sections: { icon: string, name: string, url: string }[];
  private currentUrl: string;
  tenantId: string;
  mainMenu: any;
  role: any;

  constructor(private router: Router, private service: DynamicService) {

  }

  ngOnInit() {

    this.service.getUserRole().subscribe((data: any) => {
      this.role = data.data.role[0];
      console.log(JSON.stringify(data));

    }, err => {

    });

    this.currentUrl = this.router.url.split('/')[1];

    this.tenantId = localStorage.getItem('tenantId');

    this.mainMenu = [
      {
        name: 'SUIVI CULTURAL',
        permission: ['distributionCenter.stocks.grid'],
        icon: 'fa flaticon-clipboard',
        url: '/incidents/liste',
        queryParams: { magazin: this.tenantId },
        description: '',
        subMenu: [
          /* { icon: 'fa fa-archive', name: 'Mon stock', url: '/stock/situation', permission: ['distributionCenter.stocks.grid'], },*/
          {
            icon: 'fa flaticon-clipboard',
            name: 'Liste des incidents',
            url: '/incidents/liste',
            permission: ['preconization.interventions.store'],
          },
          {
            icon: 'fa flaticon-clipboard',
            name: 'Etat de la culture',
            url: '/fieldstates/liste',
            permission: ['preconization.interventions.store'],
          },
          {
            icon: 'fa flaticon-computer',
            name: 'Parcelles observatoires',
            url: '/incidents/todos',
            permission: ['parcel.diagnose.activate'],
          },
          {
            name: 'Suivi cultural',
            permission: ['preconization.interventions.store'],
            icon: 'flaticon-map-location',
            url: '/carte/suivi',
            disabled: 'false'
          }
        ],
        disabled: 'false'
      },
      {
        name: 'Contrats',
        permission: ['agreement.contracts.grid'],
        icon: 'flaticon-file',
        url: '/contrats/liste',
        description: '',
        subMenu: [
          {
            icon: 'flaticon-plus',
            name: 'Nouveau contrat',
            url: '/contrats/ajouter',
            permission: ['agreement.contracts.store'],
          },
          {
            icon: 'flaticon-list',
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
            icon: 'flaticon-list',
            name: 'Liste des parcelles',
            url: '/parcelles/liste',
            permission: ['agreement.parcels.grid'],
          },

        ],
        disabled: 'false'
      },
      {
        name: 'Agrégés',
        permission: ['thirdParty.third-parties.grid'],
        icon: 'flaticon-users',
        url: '/tiers/liste',
        description: '',
        /*subMenu: [
          {
            icon: 'flaticon-users',
            name: 'Liste des agrégés',
            url: '/tiers/liste',
            permission: ['thirdParty.third-parties.grid']
          },
        ],*/
        disabled: 'false'
      },
      {
        name: 'Centres de distribution',
        permission: ['distributionCenter.warehouses.grid'],
        icon: 'flaticon-user',
        url: '/jeunepromoteurs/liste',
        description: '',
        /*subMenu: [
          {
            icon: 'flaticon-list',
            name: 'Liste des Centre de distribution',
            url: '/jeunepromoteurs/liste',
            permission: ['distributionCenter.warehouses.grid']
          },
        ],*/
        disabled: 'false'
      },
      {
        name: 'GESTION DES INTRANTS’',
        icon: 'flaticon-open-box',
        permission: ['distributionCenter.stocks.grid'],
        url: '/stock/situation',
        description: '',
        subMenu: [
          /* { icon: 'flaticon-line-graph', name: 'Tableau de bord', url: '/stock/board' },*/
          {
            icon: 'flaticon-list',
            name: 'Situation de stock',
            url: '/stock/situation',
            permission: ['distributionCenter.stocks.grid']
          },
          {
            icon: 'flaticon-plus',
            name: 'Approvisionnement de stock',
            url: '/stock/reappro',
            permission: ['distributionCenter.stocks.reapprovisionnement']
          },
          {
            name: 'Liste des mouvements', icon: 'fa fa-exchange', url: '/mouvements',
            description: 'Liste des mouvements', disabled: 'false', permission: ['distributionCenter.stocks.grid']
          },
          {
            name: 'Liste des demandes d\'achat', icon: 'fa  fa-shopping-cart', url: '/demandes',
            description: 'Centre de distrubition', disabled: 'false', permission: ['distributionCenter.orders.grid']
          },
          {
            icon: 'flaticon-list',
            name: 'Liste des articles',
            url: '/articles/liste',
            permission: ['distributionCenter.articlecategories.grid']
          },

        ],
        disabled: 'false'
      },
      {
        name: 'PRECONISATIONS',
        icon: 'flaticon-add',
        permission: ['preconization.interventions.grid'],
        url: '/preconisations-intrants/liste',
        description: '',
        subMenu: [
          {
            icon: 'flaticon-plus',
            name: 'Préconisation individuelle',
            url: '/interventions/selectionner',
            permission: ['preconization.interventions.store']
          },
          {
            icon: 'flaticon-tabs',
            name: 'Liste des préconisations des intrants',
            url: '/preconisations-intrants/liste',
            permission: ['preconization.articletemplates.grid']
          }
        ],
        disabled: 'false'
      },
      {
        name: 'AVANCES & PRIMES',
        icon: 'flaticon-list-1',
        permission: ['preconization.interventions.avance_prime'],
        url: '/preconisations-intrants/avance-primes',
        description: '',
        subMenu: [
          {
            icon: 'flaticon-list-1',
            name: 'Liste des  avances et primes',
            url: '/preconisations-intrants/avance-primes',
            permission: ['preconization.interventions.avance_prime']
          },
          {
            icon: 'flaticon-list',
            name: 'Liste des  avances et primes (préstataires)',
            url: '/preconisations-intrants/avance-prest',
            queryParams: {
              prestataires: true
            },
            permission: ['preconization.interventions.avance_prime']
          },
        ]
      },
      {
        name: 'GESTION DE LA RECOLTE',
        icon: 'flaticon-tabs',
        permission: ['preconization.interventions.store'],
        url: '/arrachage/echantillons',
        description: '',
        subMenu: [
          {
            icon: 'flaticon-list',
            name: 'Echantillonnage',
            url: '/arrachage/echantillons',
            permission: ['preconization.interventions.store']
          },
          {
            icon: 'flaticon-list-1',
            name: 'Liste des affectations des camions',
            url: '/arrachage/chargements',
            permission: ['preconization.interventions.store']
          },
          {
            icon: 'flaticon-email',
            name: 'Convocations d\'arrachage',
            url: '/arrachage/convocations',
            permission: ['preconization.interventions.store']
          }
        ]
      },
      {
        name: 'CARTES RFID',
        permission: ['agreement.cards.show'],
        icon: 'flaticon-web',
        url: '/reporting/cards',
        description: '',
        subMenu: [
          { icon: 'flaticon-list-3', name: 'Liste des cartes RFID', url: '/reporting/cards', permission: ['agreement.cards.show'] },
          { icon: 'flaticon-tool', name: 'Générateur de carte', url: '/carte-generateur/index', permission: ['agreement.cards.store'] }
        ],
        disabled: 'false'
      },
      {
        name: 'GESTION DES UTILISATEURS',
        permission: ['user.roles.grid'],
        icon: 'flaticon-user-settings',
        url: '/roles/liste',
        description: '',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveau role', url: '/roles/ajouter', permission: ['user.roles.store'] },
          { icon: 'flaticon-list', name: 'Liste des roles', url: '/roles/liste', permission: ['user.roles.grid'] },
          { icon: 'fa fa-users', name: 'Liste des utilisateurs', url: '/utilisateurs/liste', permission: ['user.users.index'] },
          { icon: 'fa fa-clock-o', name: 'Journal des activités', url: '/activity/index', permission: ['user.users.index'] },
          { icon: 'fa fa-upload', name: 'Import', url: '/import/index', permission: ['user.users.index'] },
        ],
        disabled: 'false'
      },
      {
        name: 'Reporting',
        permission: ['preconization.interventions.grid'],
        icon: 'flaticon-graphic-1',
        url: '/reporting/contracts',
        description: '',
        disabled: 'false'
      }
    ];

  }


  ngAfterViewInit() {

    mLayout.initAside();

  }

}
