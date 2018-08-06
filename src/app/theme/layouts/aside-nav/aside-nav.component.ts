import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.currentUrl = this.router.url.split('/')[1];
    this.tenantId = localStorage.getItem('tenantId');

    this.mainMenu = [
      {
        name: 'Contrats',
        permission : ['agreement.contracts.grid'],
        icon: 'flaticon-file',
        url: '/contrats/liste',
        description: 'Gestion des Contrats',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveau contrat', url: '/contrats/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des contrats', url: '/contrats/liste' },
          { icon: 'flaticon-list', name: 'Contrats actifs', url: '/contrats/liste/courant' },
          { icon: 'flaticon-list', name: 'Liste des parcelles', url: '/parcelles/liste' },

        ],
        disabled: 'false'
      },
      {
        name: 'Agrégés',
        permission : ['none'],
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
        permission : ['distributionCenter.warehouses.grid'],
        icon: 'flaticon-user',
        url: '/jeunepromoteurs/liste',
        description: 'Gestion des Centre de distribution',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveau Centre de distribution', url: '/jeunepromoteurs/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des Centre de distribution', url: '/jeunepromoteurs/liste' },

        ],
        disabled: 'false'
      },
      {
        name: 'Stock',
        icon: 'flaticon-open-box',
        permission : ['none'],
        url: '/stock/situation',
        description: 'Gestion de stock',
        subMenu: [
          /* { icon: 'flaticon-line-graph', name: 'Tableau de bord', url: '/stock/board' },*/
          { icon: 'flaticon-list', name: 'Situation de stock', url: '/stock/situation' },
          { icon: 'flaticon-plus', name: 'Approvisionnement de stock', url: '/stock/reappro' },
          {
            name: 'Liste des mouvements', icon: 'fa fa-exchange', url: '/mouvements',
            description: 'Liste des mouvements', disabled: 'false'
          },
          {
            name: 'Liste des demandes d\'achat', icon: 'fa  fa-shopping-cart', url: '/demandes',
            description: 'Centre de distrubition', disabled: 'false'
          },
          { icon: 'flaticon-list', name: 'Liste des articles', url: '/articles/liste' },

        ],
        disabled: 'false'
      },
      {
        name: 'interventions',
        icon: 'flaticon-add',
        permission : ['none'],
        url: '/interventions/liste',
        description: 'Gestion des interventions',
        subMenu: [
          /* { icon: 'flaticon-line-graph', name: 'Tableau de bord', url: '/stock/board' },*/
          { icon: 'flaticon-plus', name: 'Nouvelle préconisation', url: '/interventions/selectionner' },
          { icon: 'flaticon-list', name: 'Liste des interventions', url: '/interventions/liste' },
        ],
        disabled: 'false'
      },
      {
        name: 'Mon stock',
        permission : ['none'],
        icon: 'fa fa-archive',
        url: '/stock/situation',
        queryParams: { magazin: this.tenantId },
        description: 'mon stock',
        disabled: 'false'
      },
      {
        name: 'Cartes',
        permission : ['agreement.cards.grid'],
        icon: 'flaticon-tabs',
        url: '/cartes/liste',
        description: 'Generateur de cartes',
        disabled: 'false'
      },
      {
        name: 'Préconisations intrants',
        permission : ['none'],
        icon: 'flaticon-list-1',
        url: '/preconisations-intrants/liste',
        description: 'Préconisations intrants',
        disabled: 'false'
      },
      {
        name: 'Préconisations en mass',
        permission : ['none'],
        icon: 'flaticon-file-1',
        url: '/interventions/appliquer-template-parcelle',
        description: 'Preconisations intrants',
        disabled: 'false'
      },
      {
        name: 'Roles',
        permission : ['none'],
        icon: 'flaticon-lock',
        url: '/roles/liste',
        description: 'Gestion des roles',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveau role', url: '/roles/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des roles', url: '/roles/liste' },

        ],
        disabled: 'false'
      },
      {
        name: 'Utilisateurs',
        permission : ['none'],
        icon: 'fa fa-users',
        url: '/utilisateurs/liste',
        description: 'Gestion des roles',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouvel utilisateur', url: '/utilisateurs/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des utilisateurs', url: '/utilisateurs/liste' },

        ],
        disabled: 'false'
      }
    ];

  }


  ngAfterViewInit() {

    mLayout.initAside();

  }

}
