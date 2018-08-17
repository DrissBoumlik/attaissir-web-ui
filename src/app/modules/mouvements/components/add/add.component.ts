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
import { NewComponent } from '../../../interventions/components/new/new.component';

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
          this.stock_operation.quantity = 0;
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
          if (event.selectedItem.ID === 'receive') {
            this.warehouseService.getERByType('return').subscribe(
              (res: any) => {
                this.emetteurOptions = {
                  label: 'Fournisseur',
                  displayExpr: 'full_name',
                  valueExpr: 'id',
                  searchEnabled: true,
                  dataSource: res.data.recepteur
                };
                this.recepteurOptions = {
                  label: 'Magasin',
                  displayExpr: 'name',
                  valueExpr: 'id',
                  searchEnabled: true,
                  dataSource: res.data.emetteur,
                };
              }
            );
            this.articleService.getByOperationType('receive').subscribe(
              (res: any) => {
                this.familleOptions = {
                  label: 'Famille',
                  displayExpr: 'name',
                  valueExpr: 'id',
                  searchEnabled: true,
                  searchMode: 'startswith',
                  searchExpr: ['name'],
                  dataSource: res.data,
                  onSelectionChanged: (event1) => {
                    this.category = event1.selectedItem.name;
                    this.subFamilleOptions = {
                      label: 'Sous-Famille',
                      displayExpr: 'name',
                      valueExpr: 'id',
                      searchEnabled: true,
                      searchMode: 'startswith',
                      searchExpr: ['name'],
                      dataSource: new CustomStore({
                        load: (loadOptions: any) => {
                          return this.familleService.getArticleSubCategories(event1.selectedItem.id)
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
            );
            /*if (Helper.permissionMethod(['distributionCenter.articles.reception'])) {
              this.familleOptions = {
                label: 'Famille',
                displayExpr: 'name',
                valueExpr: 'id',
                searchEnabled: true,
                searchMode: 'startswith',
                searchExpr: ['name'],
                dataSource: [{ id: 1, name: 'Semences', code: 'SEME', parent_id: null }],
                onSelectionChanged: (event1) => {
                  this.category = event1.selectedItem.name;
                  this.subFamilleOptions = {
                    label: 'Sous-Famille',
                    displayExpr: 'name',
                    valueExpr: 'id',
                    searchEnabled: true,
                    searchMode: 'startswith',
                    searchExpr: ['name'],
                    dataSource: new CustomStore({
                      load: (loadOptions: any) => {
                        return this.familleService.getArticleSubCategories(event1.selectedItem.id)
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
            }*/
          } else if (event.selectedItem.ID === 'return') {
            this.warehouseService.getERByType('return').subscribe(
              (res) => {
                this.emetteurOptions = {
                  label: 'Magasin',
                  displayExpr: 'name',
                  valueExpr: 'id',
                  searchEnabled: true,
                  dataSource: res.data.emetteur
                };
                this.recepteurOptions = {
                  label: 'Fournisseur',
                  displayExpr: 'full_name',
                  valueExpr: 'id',
                  searchEnabled: true,
                  dataSource: res.data.recepteur
                };

              }
            );
            this.articleService.getByOperationType('return').subscribe(
              (res: any) => {
                this.familleOptions = {
                  label: 'Famille',
                  displayExpr: 'name',
                  valueExpr: 'id',
                  searchEnabled: true,
                  searchMode: 'startswith',
                  searchExpr: ['name'],
                  dataSource: res.data,
                  onSelectionChanged: (event1) => {
                    this.category = event1.selectedItem.name;
                    this.subFamilleOptions = {
                      label: 'Sous-Famille',
                      displayExpr: 'name',
                      valueExpr: 'id',
                      searchEnabled: true,
                      searchMode: 'startswith',
                      searchExpr: ['name'],
                      dataSource: new CustomStore({
                        load: (loadOptions: any) => {
                          return this.familleService.getArticleSubCategories(event1.selectedItem.id)
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
              });
          } else if (event.selectedItem.ID === 'transfer') {
            this.warehouseService.getERByType('transfer').subscribe(
              (res) => {
                this.emetteurOptions = {
                  label: 'Magasin',
                  displayExpr: 'name',
                  valueExpr: 'id',
                  searchEnabled: true,
                  dataSource: res.data.emetteur
                };
                this.recepteurOptions = {
                  label: 'Magasin',
                  displayExpr: 'name',
                  valueExpr: 'id',
                  searchEnabled: true,
                  dataSource: res.data.recepteur
                };
                this.articleService.getByOperationType('transfer').subscribe(
                  (_res: any) => {
                    this.familleOptions = {
                      label: 'Famille',
                      displayExpr: 'name',
                      valueExpr: 'id',
                      searchEnabled: true,
                      searchMode: 'startswith',
                      searchExpr: ['name'],
                      dataSource: _res.data,
                      onSelectionChanged: (event1) => {
                        this.category = event1.selectedItem.name;
                        this.subFamilleOptions = {
                          label: 'Sous-Famille',
                          displayExpr: 'name',
                          valueExpr: 'id',
                          searchEnabled: true,
                          searchMode: 'startswith',
                          searchExpr: ['name'],
                          dataSource: new CustomStore({
                            load: (loadOptions: any) => {
                              return this.familleService.getArticleSubCategories(event1.selectedItem.id)
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
                  });
              }
            );
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

    /*  this.articleService.getByOperationType('all').subscribe(
        (res: any) => {
          this.familleOptions = {
            label: 'Famille',
            displayExpr: 'name',
            valueExpr: 'id',
            searchEnabled: true,
            searchMode: 'startswith',
            searchExpr: ['name'],
            dataSource: res.data,
            onSelectionChanged: (event1) => {
              this.category = event1.selectedItem.name;
              this.subFamilleOptions = {
                label: 'Sous-Famille',
                displayExpr: 'name',
                valueExpr: 'id',
                searchEnabled: true,
                searchMode: 'startswith',
                searchExpr: ['name'],
                dataSource: new CustomStore({
                  load: (loadOptions: any) => {
                    return this.familleService.getArticleSubCategories(event1.selectedItem.id)
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
      );*/

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
      if (err.error.data) {
        NewComponent.notifyMe(err.error.data, 'warning', 5000);
      } else {
        NewComponent.notifyMe('Une erreur s\'est produite, veuillez réessayer dans quelques secondes.', 'error');
      }
    });
    e.preventDefault();
  }

}
