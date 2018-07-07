import {Component, OnInit, ViewChild} from '@angular/core';
import {Stock} from '../../classes/Stock';
import CustomStore from 'devextreme/data/custom_store';
import {StockService} from '../../services/stock.service';
import {ActivatedRoute} from '@angular/router';
import {WarehouseService} from '../../../distribution-center/services/warehouse.service';
import {DxDataGridComponent} from 'devextreme-angular';
import {ToastrService} from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-replenishment',
  templateUrl: './replenishment.component.html',
  styleUrls: ['./replenishment.component.scss']
})
export class ReplenishmentComponent implements OnInit {

  stock: any = {};
  selectedItems: any;
  toOrder = [];
  queryParams = '';


  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  constructor(private stockService: StockService,
              private route: ActivatedRoute,
              private warhouseService: WarehouseService,
              private toaser: ToastrService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: any) => {
        if (params.magasin) {
          this.queryParams = '?magasin=' + params.magasin;
        } else if (params.article) {
          this.queryParams =  '?article=' + params.article;
        }
        this.stock.store = new CustomStore({
          load: (loadOptions: any) => {
            return this.stockService.getStockSituationDx(loadOptions, this.queryParams)
              .toPromise()
              .then((stk: any) => {
                return {
                  data: stk.data.map((war: any) => {
                    console.log(war);
                    const row = new Stock();
                    row.warehouse = war.warehouse_name;
                    row.category = war.category_name;
                    row.sub_category = war.sub_category_name;
                    row.cda = war.warehouse_zone_name;
                    row.article = war.article_name;
                    row.threshold = war.threshold;
                    row.qr = war.qr;
                    row.dt = {warehouse_id: war.warehouse_id, article_id: war.article_id, provider_id: war.article_third_party_id};
                    return row;
                  }),
                  totalCount: stk.totalCount
                };
              })
              .catch(err => {
                throw err;
              });
          }
        });
      },
      (err: any) => {
        throw err;
      });
  }


  replenishStock() {
    const aCommander = this.toOrder.filter(to => {
      return to.qte > 0;
    });
    if (aCommander.length === 0) {
      this.toaser.warning('Rien à commander');
    } else {
      const cmd = _.orderBy(aCommander, ['provider_id', 'warehouse_id'], ['asc', 'asc']);
      this.stockService.placeOrder(cmd).subscribe(
        (res => {
          this.toaser.warning('Votre commande a été passée avec succès.');
          this.dataGrid.instance.refresh();
        }),
        (err => {
          this.toaser.warning('Une erreur s\'est produite, veuillez réessayer dans quelques instants.');
        })
      );
    }

  }

  valuechange(e: any, data: any, value: any): void {

    const check = this.toOrder.find(tr => {
      return tr.warehouse_id === data.value.warehouse_id
        && tr.article_id === data.value.article_id
        && tr.provider_id === data.value.provider_id;
    });

    if (!check) {
      this.toOrder.push({
        provider_id: data.value.provider_id,
        warehouse_id: data.value.warehouse_id,
        article_id: data.value.article_id,
        qte: value
      });
    } else {
      check.qte = value;
    }

    /*console.log(data);
    console.log('+++++++++++' + value);
    console.log(data.values[8]);
    data.values[8] = value;
    console.log(data.values[8]);

    this.dataGrid.instance.cellValue(data.rowIndex, 'toOrder', value);

    console.log(this.dataGrid.instance.cellValue(data.rowIndex, 'toOrder'));

    this.dataGrid.instance.cellValue(key.rowIndex, 'toOrder', values);

    this.dataGrid.instance.saveEditData();

    this.dataGrid.instance.getSelectedRowsData().forEach(srow => {
      console.log(this.dataGrid.instance.cellValue(srow.rowIndex, 'toOrder'));
    });

     console.log(this.dataGrid);

    this.dataGrid.instance.cellValue(data.rowIndex, 'toOrder', value);

    this.dataGrid.instance.saveEditData();*/

  }

}
