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

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.currentUrl = this.router.url.split('/')[1];
    switch (this.currentUrl) {
      case 'tiers': {
        this.sections = [
          { icon: 'line-graph', name: 'DashBoard', url: './' },
          { icon: 'plus', name: 'New Aggregated'/*Nuveau agrégé*/, url: 'add' },
          { icon: 'list', name: 'Aggregated List'/*Liste des  agrégés*/, url: 'list' },
        ];
        break;
      }
      case 'contrats': {
        this.sections = [
          { icon: 'line-graph', name: 'DashBoard', url: './' },
          { icon: 'plus', name: 'New Contract', url: 'add' },
          { icon: 'list', name: 'Contracts List', url: 'list' },
        ];
        break;
      }
    }
  }

  ngAfterViewInit() {

    mLayout.initAside();

  }

}
