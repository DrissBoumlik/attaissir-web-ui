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
  mainMenu: any;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.currentUrl = this.router.url.split('/')[1];


    this.mainMenu = [
      {
        name: 'Agrégés',
        icon: 'flaticon-users',
        url: '/tiers/liste',
        description: 'Gestion des agrégés',
        /*subMenu: [
          { icon: 'flaticon-plus', name: 'Nouvel agrégé', url: '/tiers/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des agrégés', url: '/tiers/liste' },
        ],*/
        disabled: 'false'
      },
      {
        name: 'Jeune promoteur',
        icon: 'flaticon-users',
        url: '/jeunepromoteurs/liste',
        description: 'Gestion des Jeune promoteurs',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouvel Jeune promoteur', url: '/jeunepromoteurs/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des Jeune promoteurs', url: '/jeunepromoteurs/liste' },
        ],
        disabled: 'false'
      },
      {
        name: 'Stock',
        icon: 'flaticon-open-box',
        url: '/stock',
        description: 'Gestion de stock',
        subMenu: [
          { icon: 'flaticon-line-graph', name: 'Tableau de bord', url: '/stock/board' },
          { icon: 'flaticon-list', name: 'Situation de stock', url: '/stock/situation' },
          { icon: 'flaticon-plus', name: 'Réapprovisionnement de stock', url: '/stock/reappro' },
        ],
        disabled: 'false'
      },
      {
        name: 'Magasin',
        icon: 'fa fa-shopping-bag',
        url: '/magasin/liste',
        description: 'magasin',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveau magasin', url: '/magasin/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des magasins', url: '/magasin/liste' },
          { icon: 'flaticon-list', name: 'réapprovisionnement de stock', url: '/magasin/reapprovisionnement' },
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
        name: 'Contrats',
        icon: 'flaticon-file',
        url: '/contrats/liste',
        description: 'Gestion des Contrats',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveau contrat', url: '/contrats/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des contrats', url: '/contrats/liste' },
          { icon: 'flaticon-list', name: 'Contrats de cette campagne', url: '/contrats/liste/courant' },
          { icon: 'flaticon-list', name: 'Liste des parcelles', url: '/parcelles/liste' },
        ],
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
        name: 'Liste des mouvements',
        icon: 'fa fa-exchange',
        url: '/mouvements',
        description: 'Liste des mouvements',
        disabled: 'false'
      },

      {
        name: 'Centre de distrubition',
        icon: 'flaticon-open-box',
        url: '/articles/liste',
        description: 'Centre de distrubition',
        subMenu: [
          { icon: 'flaticon-list', name: 'Liste des articles', url: '/articles/liste' },
        ],
        disabled: 'false'
      },
      {
        name: 'Liste des demandes d\'achat\n',
        icon: 'fa  fa-shopping-cart',
        url: '/demandes',
        description: 'Centre de distrubition',
        disabled: 'false'
      }
    ];

  }




  ngAfterViewInit() {

    mLayout.initAside();

  }

}
