import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

    dataSource = [];
    activeWarehouses = [
        { name: 'Magasin1', count: 1500 },
        { name: 'Magasin2', count: 4000 },
        { name: 'Magasin11', count: 1500 },
        { name: 'Magasin4', count: 2000 },
        { name: 'Magasin10', count: 1475 },
        { name: 'Magasin6', count: 2586 },
    ];
    inactiveWarehouses = [
        { name: 'Magasin7', count: 20 },
        { name: 'Magasin3', count: 40 },
        { name: 'Magasin15', count: 100 },
        { name: 'Magasin9', count: 120 },
        { name: 'Magasin19', count: 103 }
    ];

    constructor(private stockService: StockService) { }

    ngOnInit() {
        this.dataSource = this.stockService.getStatsVar();
    }

}
