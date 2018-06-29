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
        name: 'Conseille agricole',
        icon: 'flaticon-user',
        url: '/conseille-agricole/liste',
        description: 'Conseille agricole',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveau Conseille', url: '/conseille-agricole/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des Conseille', url: '/conseille-agricole/liste' },
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
        ],
        disabled: 'false'
      },
      {
        name: 'Commande',
        icon: 'fa fa-cart-plus',
        url: '/commande/liste',
        description: 'commande',
        subMenu: [
          { icon: 'flaticon-plus', name: 'nouvelle commande', url: '/commande/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des commandes', url: '/commande/liste' },
        ],
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
        name: 'Centre de distrubition',
        icon: 'flaticon-open-box',
        url: '/articles/liste',
        description: 'Centre de distrubition',
        subMenu: [
          { icon: 'flaticon-list', name: 'Liste des articles', url: '/articles/liste' },
        ],
        disabled: 'false'
      },
    ];

  }

  ngAfterViewInit() {

    mLayout.initAside();

  }

}
