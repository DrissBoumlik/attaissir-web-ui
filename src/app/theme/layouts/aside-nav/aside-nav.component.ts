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
          { icon: 'flaticon-plus', name: 'New Aggregated'/*Nuveau agrégé*/, url: '/tiers/ajouter' },
          { icon: 'flaticon-list', name: 'Aggregated List'/*Liste des  agrégés*/, url: '/tiers/liste' },
        ],
        disabled: 'false'
      },
      {
        name: 'Contracts',
        icon: 'flaticon-file',
        url: '/contrats/liste',
        description: 'Gestion des Contracts',
        subMenu: [
          { icon: 'flaticon-plus', name: 'New Contract', url: '/contrats/ajouter' },
          { icon: 'flaticon-list', name: 'Contracts List', url: '/contrats/liste' },
        ],
        disabled: 'false'
      },
      {
        name: 'Intrants',
        icon: 'flaticon-coins',
        url: '/intrants',
        description: 'Gestion des Intrants',
        disabled: 'false'
      },
      {
        name: 'Interventions',
        icon: 'flaticon-coins',
        url: '/interventions',
        description: 'Gestion des Interventions',
        disabled: 'false'
      },
      {
        name: 'Map',
        icon: 'flaticon-map-location',
        url: '/map',
        description: 'Suivi des vehicules en temps réel',
        disabled: 'false'
      },
      {
        name: 'Configuration',
        icon: 'flaticon-cogwheel',
        url: '/config',
        description: 'Global configuration',
        disabled: 'false'
      }
    ]
    console.log(this.mainMenu);

  }

  ngAfterViewInit() {

    mLayout.initAside();

  }

}
