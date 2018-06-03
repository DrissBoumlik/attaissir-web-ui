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
    // switch (this.currentUrl) {
    //   case 'tiers': {
    //     this.sections = [
    //       { icon: 'line-graph', name: 'DashBoard', url: './' },
    //       { icon: 'plus', name: 'New Aggregated'/*Nuveau agrégé*/, url: 'add' },
    //       { icon: 'list', name: 'Aggregated List'/*Liste des  agrégés*/, url: 'list' },
    //     ];
    //     break;
    //   }
    //   case 'contrats': {
    //     this.sections = [
    //       { icon: 'line-graph', name: 'DashBoard', url: './' },
    //       { icon: 'plus', name: 'New Contract', url: 'add' },
    //       { icon: 'list', name: 'Contracts List', url: 'list' },
    //     ];
    //     break;
    //   }
    // }
    
    this.mainMenu = [
      {
        name : 'Tiers',
        icon : 'flaticon-users',
        url : 'tiers',
        description : 'Gestion des tiers',
        subMenu : [
            { icon: 'flaticon-plus', name: 'New Aggregated'/*Nuveau agrégé*/, url: 'add' },
            { icon: 'flaticon-list', name: 'Aggregated List'/*Liste des  agrégés*/, url: 'list' },
          ]
      },
      {
        name : 'Contracts',
        icon : 'flaticon-file',
        url : 'contrats',
        description : 'Gestion des Contracts',
        subMenu : [
            { icon: 'flaticon-plus', name: 'New Contract', url: 'add' },
            { icon: 'flaticon-list', name: 'Contracts List', url: 'list' },
          ]
      },
      {
        name : 'Intrants',
        icon : 'flaticon-coins',
        url : '/intrants',
        description : 'Gestion des Intrants'
      },
      {
        name : 'Interventions',
        icon : 'flaticon-coins',
        url : '/interventions',
        description : 'Gestion des Interventions'
      },
      {
        name : 'Map',
        icon : 'flaticon-map-location',
        url : '/map',
        description : 'Suivi des vehicules en temps réel'
      },
      {
        name : 'Configuration',
        icon : 'flaticon-cogwheel',
        url : '/config',
        description : 'Global configuration'
      }
    ]
    console.log(this.mainMenu);
    
  }

  ngAfterViewInit() {

    mLayout.initAside();

  }

}
