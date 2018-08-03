import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../../shared/classes/helper';
import { MouvementsService } from '../../service/mouvements.service';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';
import { ThirdsService } from '../../../thirds/services/thirds.service';
import { WarehouseService } from '../../../warehouse/service/warehose.service';
import { ArticleCategiesService } from '../../../articles/services/article-categies.service';
import { ArticlesService } from '../../../articles/services/articles.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DemandesService } from '../../../demandes/service/demandes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  stock_operation: any;
  stockData: any;
  products: any;
  commandes: any;

  emetteurData: any;

  typeOptions: any;
  emetteurOptions: any;
  commandeOptions: any;
  recepteurOptions: any;
  category: string;
  subCategory: string;
  article: string;
  familleOptions: any;
  subFamilleOptions: any;
  articleOptions: any;
  addProduct: any;
  buttonOptions: any;
  helper: any;
  unit: string;
  rules: any;

  constructor(public mouvementService: MouvementsService,
    public commandeService: DemandesService,
    public thirdService: ThirdsService,
    public warehouseService: WarehouseService,
    public familleService: ArticleCategiesService,
    public articleService: ArticlesService,
    private router: Router,
    public toastr: ToastrService) {
    this.stock_operation = {};
    this.helper = Helper;
    this.commandes = {};
    this.emetteurData = {};
    this.products = [];
  }

  ngOnInit() {
    this.rules = { 'X': /[0-9]+/ };
    this.addProduct = {
      text: 'AJOUTER',
      type: 'success',
      useSubmitBehavior: false,
      onClick: (e) => {
        console.log(this.stock_operation);
        if (this.stock_operation.quantity > 0) {
          this.products.push({
            category: this.category,
            subCategory: this.subCategory,
            article: this.article,
            famille_id: this.stock_operation.famille,
            sub_famille_id: this.stock_operation.sub_famille,
            article_id: this.stock_operation.article,
            quantity1: this.stock_operation.quantity
          });
        } else {
          this.toastr.warning('La quantité doit être supérieure à 0.');
        }
      }
    };
    this.buttonOptions = {
      text: 'ENREGISTER',
      type: 'success',
      useSubmitBehavior: true
    };

    this.mouvementService.getMouvementVars().subscribe((data) => {
      const type = data['type'];
      const state = data['state'];
      this.typeOptions = {
        label: 'Type',
        dataSource: Helper.dataSourceformatter(type),
        displayExpr: 'Name',
        valueExpr: 'ID',
        onSelectionChanged: (event) => {
          console.log(event);
          if (event.selectedItem.ID === 'receive' || event.selectedItem.ID === 'delivery') {
            this.emetteurOptions = {
              label: 'Émetteur',
              displayExpr: 'full_name',
              valueExpr: 'id',
              searchEnabled: true,
              dataSource: new CustomStore({
                load: (loadOptions: any) => {
                  loadOptions['filter'] = ['ts_type', '=', 'products_supplier'];
                  return this.thirdService.getThirdsDx('products_supplier', loadOptions)
                    .toPromise()
                    .then(response => {
                      const json = response;
                      console.log(response);
                      return json;
                    })
                    .catch(error => {
                      console.log(error);
                      throw error;
                    });
                },
              })
            };
            this.recepteurOptions = {
              label: 'Récepteur',
              displayExpr: 'name',
              valueExpr: 'id',
              searchEnabled: true,
              dataSource: new CustomStore({
                load: (loadOptions: any) => {
                  return this.warehouseService.getAllDx(loadOptions)
                    .toPromise()
                    .then(response => {
                      const json = response;
                      console.log(response);
                      return json;
                    })
                    .catch(error => {
                      console.log(error);
                      throw error;
                    });
                },
              })
            };
          } else if (event.selectedItem.ID === 'return') {
            this.emetteurOptions = {
              label: 'Émetteur',
              displayExpr: 'name',
              valueExpr: 'id',
              searchEnabled: true,
              dataSource: new CustomStore({
                load: (loadOptions: any) => {
                  return this.warehouseService.getAllDx(loadOptions)
                    .toPromise()
                    .then(response => {
                      const json = response;
                      console.log(response);
                      return json;
                    })
                    .catch(error => {
                      console.log(error);
                      throw error;
                    });
                },
              })
            };
            this.recepteurOptions = {
              label: 'Récepteur',
              displayExpr: 'full_name',
              valueExpr: 'id',
              searchEnabled: true,
              dataSource: new CustomStore({
                load: (loadOptions: any) => {
                  loadOptions['filter'] = ['ts_type', '=', 'products_supplier'];
                  return this.thirdService.getThirdsDx('products_supplier', loadOptions)
                    .toPromise()
                    .then(response => {
                      const json = response;
                      console.log(response);
                      return json;
                    })
                    .catch(error => {
                      console.log(error);
                      throw error;
                    });
                },
              })
            };
            // code
          } else if (event.selectedItem.ID === 'transfer') {
            this.emetteurOptions = {
              label: 'Émetteur',
              displayExpr: 'name',
              valueExpr: 'id',
              searchEnabled: true,
              dataSource: new CustomStore({
                load: (loadOptions: any) => {
                  return this.warehouseService.getAllDx(loadOptions)
                    .toPromise()
                    .then(response => {
                      const json = response;
                      console.log(response);
                      return json;
                    })
                    .catch(error => {
                      console.log(error);
                      throw error;
                    });
                },
              })
            };
            this.recepteurOptions = {
              label: 'Récepteur',
              displayExpr: 'name',
              valueExpr: 'id',
              searchEnabled: true,
              dataSource: new CustomStore({
                load: (loadOptions: any) => {
                  return this.warehouseService.getAllDx(loadOptions)
                    .toPromise()
                    .then(response => {
                      const json = response;
                      console.log(response);
                      return json;
                    })
                    .catch(error => {
                      throw error;
                    });
                },
              })
            };
          }
        }
      };

    }, error1 => {
      throw error1;
    });


    this.commandeOptions = {
      label: 'Commande',
      displayExpr: 'code',
      valueExpr: 'id',
      searchEnabled: true,
      dataSource: new CustomStore({
        load: (loadOptions: any) => {
          return this.commandeService.getAllDx(loadOptions)
            .toPromise()
            .then(response => {
              const json = response;
              return json.data;
            })
            .catch(error => {
              console.log(error);
              throw error;
            });
        },
      })
    };

    this.familleOptions = {
      label: 'Famille',
      displayExpr: 'name',
      valueExpr: 'id',
      searchEnabled: true,
      searchMode: 'startswith',
      searchExpr: ['name'],
      dataSource: new CustomStore({
        load: (loadOptions: any) => {
          return this.familleService.getArticleCategoriesDx(loadOptions)
            .toPromise()
            .then(response => {
              const json = response;
              return json;
            })
            .catch(error => {
              console.log(error);
              throw error;
            });
        }
      }),
      onSelectionChanged: (event) => {
        this.category = event.selectedItem.name;
        this.subFamilleOptions = {
          label: 'Sous-Famille',
          displayExpr: 'name',
          valueExpr: 'id',
          searchEnabled: true,
          searchMode: 'startswith',
          searchExpr: ['name'],
          dataSource: new CustomStore({
            load: (loadOptions: any) => {
              return this.familleService.getArticleSubCategories(event.selectedItem.id)
                .toPromise()
                .then(response => {
                  const json = response.data;
                  return json;
                })
                .catch(error => {
                  console.log(error);
                  throw error;
                });
            }
          }),
          onSelectionChanged: (e) => {
            this.subCategory = e.selectedItem.name;
            this.articleOptions = {
              label: 'Article',
              displayExpr: 'name',
              valueExpr: 'id',
              searchEnabled: true,
              searchMode: 'startswith',
              searchExpr: ['name'],
              dataSource: new CustomStore({
                load: (loadOptions: any) => {
                  return this.articleService.getArticlesByFamily(e.selectedItem.id)
                    .toPromise()
                    .then(response => {
                      const json = response.data;
                      console.log(response);
                      return json;
                    })
                    .catch(error => {
                      console.log(error);
                      throw error;
                    });
                }
              }),
              onSelectionChanged: (evnt) => {
                this.article = evnt.selectedItem.name;
                this.unit = evnt.selectedItem.unit;
              }
            };
          }
        };
      }
    };
  }

  AddMovement = (e) => {
    console.log(this.stock_operation);
    console.log(this.products);
    const data = {
      'stock_operation': this.stock_operation,
      'products': this.products
    };
    this.mouvementService.addMouvement(data).subscribe(d => {
      console.log(d);
      d = this.helper.dataFormatter(d, false);
      this.toastr.success(
        `Mouvement ajouté avec succès.`);
      this.router.navigate([`/mouvements/afficher/${d['id']}`]);
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    });
    e.preventDefault();
  }

}
