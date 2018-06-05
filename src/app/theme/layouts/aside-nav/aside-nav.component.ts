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
        name: 'Tiers',
        icon: 'flaticon-users',
        url: '/tiers/liste',
        description: 'Gestion des tiers',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveaux agrégé'/*Nuveau agrégé*/, url: '/tiers/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des agrégés'/*Liste des  agrégés*/, url: '/tiers/liste' },
        ],
        disabled: 'false'
      },
      {
        name: 'Contracts',
        icon: 'flaticon-file',
        url: '/contrats/liste',
        description: 'Gestion des Contracts',
        subMenu: [
          { icon: 'flaticon-plus', name: 'Nouveau contrat', url: '/contrats/ajouter' },
          { icon: 'flaticon-list', name: 'Liste des contrats', url: '/contrats/liste' },
        ],
        disabled: 'false'
      }
    ]

  }

  ngAfterViewInit() {

    mLayout.initAside();

  }

}
