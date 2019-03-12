import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportingService } from './services/reporting-service.service';

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.html',
    styleUrls: []
})
export class ReportingComponent implements OnInit {

    reports = [];
    selectedItem: any;
    loadingVisible = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private reportingService: ReportingService) {
    }

    ngOnInit() {
        this.loadingVisible = true;
        this.reportingService.getVarsByZone(1)
            .subscribe((res: any) => {
                this.reports = res.reports;
                this.loadingVisible = false;
            });
    }

    onSelectionChanged(e) {
        this.selectedItem = this.reports.find(report => {
            return report.code === e.value;
        });
        this.router.navigate([this.selectedItem.url], { relativeTo: this.route });
    }
}
