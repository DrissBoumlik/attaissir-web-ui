import {Component, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {Helpers} from '../../../helpers';
import {ActivatedRoute, Router} from '@angular/router';

declare let mLayout: any;

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {
  public sections: { icon: string, name: string, url: string }[];
  private currentUrl: string;
  mainMenu: any;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.currentUrl = this.router.url.split('/')[1];


    this.mainMenu = [
      {
        name: 'Gestion des Utilisateurs',
        icon: 'flaticon-user-add',
        url: '/utilisateurs/liste',
        description: 'Gestion des Utilisateurs',
        subMenu: [
          {icon: 'flaticon-users', name: 'Liste des utilisateurs', url: '/utilisateurs/liste'},
          {icon: 'flaticon-plus', name: 'Nouvel utilisateur', url: '/utilisateurs/ajouter'}
        ],
        disabled: 'false'
      },
      {
        name: 'Contrats',
        icon: 'flaticon-file',
        url: '/contrats/liste',
        description: 'Gestion des Contrats',
        subMenu: [
          {icon: 'flaticon-plus', name: 'Nouveau contrat', url: '/contrats/ajouter'},
          {icon: 'flaticon-list', name: 'Liste des contrats', url: '/contrats/liste'},
          {icon: 'flaticon-list', name: 'Contrats actifs', url: '/contrats/liste/courant'},
          {icon: 'flaticon-list', name: 'Liste des parcelles', url: '/parcelles/liste'},

        ],
        disabled: 'false'
      },
      {
        name: 'Agrégés',
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
        icon: 'flaticon-user',
        url: '/jeunepromoteurs/liste',
        description: 'Gestion des Centre de distribution',
        subMenu: [
          {icon: 'flaticon-plus', name: 'Nouvel Centre de distribution', url: '/jeunepromoteurs/ajouter'},
          {icon: 'flaticon-list', name: 'Liste des Centre de distribution', url: '/jeunepromoteurs/liste'},

        ],
        disabled: 'false'
      },
      {
        name: 'Stock',
        icon: 'flaticon-open-box',
        url: '/stock/situation',
        description: 'Gestion de stock',
        subMenu: [
          /* { icon: 'flaticon-line-graph', name: 'Tableau de bord', url: '/stock/board' },*/
          {icon: 'flaticon-list', name: 'Situation de stock', url: '/stock/situation'},
          {icon: 'flaticon-plus', name: 'Approvisionnement de stock', url: '/stock/reappro'},

          {
            name: 'Liste des mouvements', icon: 'fa fa-exchange', url: '/mouvements',
            description: 'Liste des mouvements', disabled: 'false'
          },
          {
            name: 'Liste des demandes d\'achat', icon: 'fa  fa-shopping-cart', url: '/demandes',
            description: 'Centre de distrubition', disabled: 'false'
          },
          {icon: 'flaticon-list', name: 'Liste des articles', url: '/articles/liste'},

        ],
        disabled: 'false'
      },
      {
        name: 'interventions',
        icon: 'flaticon-add',
        url: '/interventions/liste',
        description: 'Gestion des interventions',
        subMenu: [
          /* { icon: 'flaticon-line-graph', name: 'Tableau de bord', url: '/stock/board' },*/
          {icon: 'flaticon-plus', name: 'Nouvelle  demande d\'intervention', url: '/interventions/selectionner'}
        ],
        disabled: 'false'
      },
      {
        name: 'Mon stock',
        icon: 'fa fa-archive',
        url: '/mouvements/mon_stock',
        description: 'mon stock',
        disabled: 'false'
      },
      {
        name: 'Cartes',
        icon: 'flaticon-tabs',
        url: '/cartes/liste',
        description: 'Generateur de cartes',
        disabled: 'false'
      },
      {
        name: 'Préconisations intrants',
        icon: 'flaticon-warehouse-list-3',
        url: '/preconisations-intrants/liste',
        description: 'Préconisations intrants',
        disabled: 'false'
      },
      {
        name: 'Préconisations en mass',
        icon: 'flaticon-file-1',
        url: '/interventions/appliquer-template-parcelle',
        description: 'Preconisations intrants',
        disabled: 'false'
      },
    ];

  }


  ngAfterViewInit() {

    mLayout.initAside();

  }

}
