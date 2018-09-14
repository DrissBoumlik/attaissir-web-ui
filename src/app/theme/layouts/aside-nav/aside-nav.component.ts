import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { ActivatedRoute, Router } from '@angular/router';
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
        name: 'Mon stock',
        permission: ['distributionCenter.stocks.grid'],
        icon: 'fa fa-archive',
        url: '/stock/situation',
        queryParams: { magazin: this.tenantId },
        description: 'mon stock',
        disabled: 'false'
      },
      {
        name: 'Contrats',
        permission: ['agreement.contracts.grid'],
        icon: 'flaticon-file',
        url: '/contrats/liste',
        description: 'Gestion des Contrats',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveau contrat', url: '/contrats/ajouter', permission: ['agreement.contracts.store'], },
          { icon: 'flaticon-list', name: 'Liste des contrats', url: '/contrats/liste', permission: ['agreement.contracts.grid'], },
          { icon: 'flaticon-list', name: 'Contrats actifs', url: '/contrats/liste/courant', permission: ['agreement.contracts.grid'], },
          { icon: 'flaticon-list', name: 'Liste des parcelles', url: '/parcelles/liste', permission: ['agreement.parcels.grid'], },

        ],
        disabled: 'false'
      },
      {
        name: 'Agrégés',
        permission: ['thirdParty.third-parties.grid'],
        icon: 'flaticon-users',
        url: '/tiers/liste',
        description: 'Gestion des agrégés',
        /*subMenu: [
          { icon: 'flaticon-plus', name: 'Nouvel agrégé', url: '/tiers/ajouter' },
          { icon: 'flaticon-warehouse-list', name: 'Liste des agrégés', url: '/tiers/liste' },
        ],*/
        disabled: 'false'
      },
      {
        name: 'Centre de distribution',
        permission: ['distributionCenter.warehouses.grid'],
        icon: 'flaticon-user',
        url: '/jeunepromoteurs/liste',
        description: 'Gestion des Centre de distribution',
        subMenu: [
          { icon: 'flaticon-list', name: 'Liste des Centre de distribution', url: '/jeunepromoteurs/liste', permission: ['distributionCenter.warehouses.grid'] },
        ],
        disabled: 'false'
      },
      {
        name: 'Stock',
        icon: 'flaticon-open-box',
        permission: ['distributionCenter.stocks.grid'],
        url: '/stock/situation',
        description: 'Gestion de stock',
        subMenu: [
          /* { icon: 'flaticon-line-graph', name: 'Tableau de bord', url: '/stock/board' },*/
          { icon: 'flaticon-list', name: 'Situation de stock', url: '/stock/situation', permission: ['distributionCenter.stocks.grid'] },
          { icon: 'flaticon-plus', name: 'Approvisionnement de stock', url: '/stock/reappro', permission: ['distributionCenter.stocks.reapprovisionnement'] },
          {
            name: 'Liste des mouvements', icon: 'fa fa-exchange', url: '/mouvements',
            description: 'Liste des mouvements', disabled: 'false', permission: ['distributionCenter.stocks.grid']
          },
          {
            name: 'Liste des demandes d\'achat', icon: 'fa  fa-shopping-cart', url: '/demandes',
            description: 'Centre de distrubition', disabled: 'false', permission: ['distributionCenter.orders.grid']
          },
          { icon: 'flaticon-list', name: 'Liste des articles', url: '/articles/liste', permission: ['distributionCenter.articlecategories.grid'] },

        ],
        disabled: 'false'
      },
      {
        name: 'interventions',
        icon: 'flaticon-add',
        permission: ['preconization.interventions.grid'],
        url: '/interventions/selectionner',
        description: 'Gestion des interventions',
        subMenu: [
          /* { icon: 'flaticon-line-graph', name: 'Tableau de bord', url: '/stock/board' },*/
          { icon: 'flaticon-plus', name: 'Nouvelle  demande d\'intervention', url: '/interventions/selectionner', permission: ['preconization.interventions.store'] }
        ],
        disabled: 'false'
      },
      {
        name: 'Cartes',
        permission: ['agreement.cards.index'],
        icon: 'flaticon-tabs',
        url: '/cartes/liste',
        description: 'Cartes',
        subMenu: [
          { icon: 'flaticon-tabs', name: 'Cartes', url: '/cartes/liste', permission: ['agreement.cards.index'] },
          { icon: 'flaticon-list', name: 'Générateur de cartes', url: '/carte-generateur/index', permission: ['agreement.cardsGenerator.show'] },
        ],
        disabled: 'false'
      },
      {
        name: 'Préconisations intrants',
        permission: ['preconization.articletemplates.grid'],
        icon: 'flaticon-list-1',
        url: '/preconisations-intrants/liste',
        description: 'Préconisations intrants',
        subMenu: [
          { icon: 'flaticon-tabs', name: 'Préconisations intrants', url: '/preconisations-intrants/liste', permission: ['preconization.articletemplates.grid'] },
          { icon: 'flaticon-list', name: 'Avances et primes', url: '/preconisations-intrants/avance-primes', permission: ['preconization.articletemplates.grid'] },
        ],
        disabled: 'false'
      },
      {
        name: 'Préconisations en mass',
        permission: ['preconization.articletemplates.store'],
        icon: 'flaticon-file-1',
        url: '/interventions/appliquer-template-parcelle',
        description: 'Preconisations intrants',
        disabled: 'false'
      },
      {
        name: 'Roles',
        permission: ['user.roles.grid'],
        icon: 'flaticon-lock',
        url: '/roles/liste',
        description: 'Gestion des roles',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveau role', url: '/roles/ajouter', permission: ['user.roles.store'] },
          { icon: 'flaticon-list', name: 'Liste des roles', url: '/roles/liste', permission: ['user.roles.grid'] },

        ],
        disabled: 'false'
      },
      {
        name: 'Utilisateurs',
        permission: ['user.users.index'],
        icon: 'fa fa-users',
        url: '/utilisateurs/liste',
        description: 'Gestion des roles',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouvel utilisateur', url: '/utilisateurs/ajouter', permission: ['user.users.store'] },
          { icon: 'flaticon-list', name: 'Liste des utilisateurs', url: '/utilisateurs/liste', permission: ['user.users.index'] },

        ],
        disabled: 'false'
      }
    ];

  }


  ngAfterViewInit() {

    mLayout.initAside();

  }

}
