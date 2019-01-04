import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.html',
  styleUrls: ['']
})
export class ReportingComponent implements OnInit {

  reports = [
    {code: 511, title: 'Situation des parcelles', url: 'contracts'},
    {code: 515, title: 'Liste des agriculteurs et cartes par site', url: 'cards'},
    {code: 611, title: 'Liste détaillée des préconisations', url: 'preconisations'},
    {code: 612, title: 'Liste détaillée des mouvements', url: 'mouvements'},
  ];
  selectedItem: any;

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.selectedItem = this.reports[0];
  }

  ngOnInit() {
    if (this.router.url.includes('mouvements')) {
      this.selectedItem = this.reports[3];
    } else if (this.router.url.includes('preconisations')) {
      this.selectedItem = this.reports[2];

    } else if (this.router.url.includes('cards')) {
      this.selectedItem = this.reports[1];

    }
  }

  onSelectionChanged(e) {
    this.selectedItem = this.reports.find(report => {
      return report.code === e.value;
    });
    this.router.navigate([this.selectedItem.url], {relativeTo: this.route});
  }
}
