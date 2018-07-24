import {Component, OnInit, ViewChild} from '@angular/core';
import {ArticlesService} from '../../../articles/services/articles.service';
import 'rxjs/add/operator/toPromise';
import {InterventionService} from '../../services/intervention.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ThirdsService} from '../../../thirds/services/thirds.service';
import {WarehouseService} from '../../../distribution-center/services/warehouse.service';
import {DxDataGridComponent} from 'devextreme-angular';
import {NewComponent} from '../new/new.component';
import {DxiItemComponent} from 'devextreme-angular/ui/nested/item-dxi';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  /*-------------------------------------------*/
  buttonsave: any;
  buttoncancel: any;
  /*-------------------------------------------*/
  addSemance: any;
  addProduct: any;
  /*-------------------------------------------*/
  parcelOptions: any;
  stwOptions: any;
  cdOptions: any;
  saveAsModelOptions: any;
  semenceQuantityOptions: any;
  productsQuantityOptions: any;
  interventions: any = {};
  custom_fields_form_data: any = {};
  third: any;
  today = new Date();
  CDs = [];
  semences: any = [];
  products: any = [];
  saveAsModel = false;
  /*-------------------------------------------*/
  semenceCategoryOptions: any;
  semenceSubCategoryOptions: any;
  semenceArticleOptions: any;
  SelectedSemenceCategory: any;
  SelectedSemenceSubCategory: any;
  SelectedSemenceArticle: any = {};
  SemenceQuantity: any;
  /*-------------------------------------------*/
  productsCategoryOptions: any;
  productsSubCategoryOptions: any;
  productsArticleOptions: any;
  SelectedProductsCategory: any;
  SelectedProductsSubCategory: any;
  SelectedProductsArticle = {};
  productsQuantity: any;
  /*-------------------------------------------*/
  @ViewChild('semenceGrid') semenceGrid: DxDataGridComponent;
  @ViewChild('productsGrid') productsGrid: DxDataGridComponent;
  /*-------------------------------------------*/
  @ViewChild('choixSemence') choixSemence: DxiItemComponent;
  @ViewChild('choixProducts') choixProducts: DxiItemComponent;
  @ViewChild('choixServices') choixServices: DxiItemComponent;
  /*-------------------------------------------*/
  data = {
    semence: [],
    products: [],
    services: []
  };
  /*-------------------------------------------*/
  prestations = [];
  selectedItems: any[] = [];
  loadingVisible = false;
  request_type_id: number;
  custom_fields = [];
  DX_custom_fields = [];
  /*-----------------CONSTANTS--------------------------*/
  DB_NUMBER_BOX = 'number';
  DB_CHECK_BOX = 'checkbox';
  /*-----------------CONSTANTS--------------------------*/
  DX_TEXT_BOX = 'dxTextBox';
  DX_NUMBER_BOX = 'dxNumberBox';
  DX_CHECK_BOX = 'dxCheckBox';
  /*-----------------CONSTANTS--------------------------*/
  SEMENCE_TYPE = 'SEME';
  PRODUCT_TYPE = 'product';
  SERVICE_TYPE = 'service';

  /*--------------------Constructor-----------------------*/

  constructor(public articleService: ArticlesService,
              public interventionService: InterventionService,
              private wareHouseService: WarehouseService,
              private route: ActivatedRoute,
              private thirdsService: ThirdsService,
              private toastr: ToastrService,
              private router: Router) {
  }

  /*--------------------Initialize content-----------------------*/
  ngOnInit() {
    this.route.queryParams.subscribe(
      (qps: any) => {
        /*-------------------------------------------------------------------------*/
        this.request_type_id = qps.sub_family_id;
        /*-------------------------------------------------------------------------*/
        this.interventionService.getDataBySubFamily(qps.sub_family_id)
          .subscribe(
            (res: any) => {
              res.data.forEach(
                (type: any) => {
                  type.categories.forEach(cat => {
                    const ctg = {
                      category_name: cat.name,
                      category_id: cat.id,
                      sub_categories: [],
                    };
                    cat.sub_categories.forEach(sucat => {
                      ctg.sub_categories.push({
                        sub_category_name: sucat.name,
                        sub_category_id: sucat.id
                      });
                    });
                    if (type.name === this.SEMENCE_TYPE) {
                      this.data.semence.push(ctg);
                    }
                    if (type.name === this.PRODUCT_TYPE) {
                      this.data.products.push(ctg);
                    }
                    if (type.name === this.SERVICE_TYPE) {
                      this.data.services.push(ctg);
                    }
                  });
                  this.data.services.forEach(cat => {
                    cat.sub_categories.forEach(subcat => {
                      this.interventionService.getServiceArticlesBySubCatID(this.request_type_id)
                        .subscribe((ars: any) => {
                          ars.data.forEach(
                            (ar: any) => {
                              this.prestations.push({
                                id: ar.id,
                                text: ar.name,
                              });
                            }
                          );
                        });
                    });
                  });
                }
              );
            }
          );
        /*-------------------------------------------------------------------------*/
        this.thirdsService.getThird(qps.third_party_id).subscribe(
          (tier: any) => {
            this.third = tier.data;
            this.interventions.third = this.third;
            this.interventionService.getLogicalParcelsByUserId(qps.third_party_id).subscribe(
              (parcels: any) => {
                this.third.parcels = [];
                parcels.data.forEach(parcel => {
                  this.third.parcels.push(
                    {
                      id: parcel.id,
                      label: parcel.name,
                      contracted_surface: parcel.exploited_surface,
                      actual_surface: parcel.manuel_surface,
                      remaining_surface: parcel.abandoned_surface,
                      id_zone: parcel.zone_id ? parcel.zone_id : 21
                    },
                  );
                });
                this.parcelOptions = {
                  displayExpr: 'label',
                  valueExpr: 'id',
                  items: this.third.parcels,
                  searchEnabled: true,
                  onSelectionChanged: (event) => {
                    if (event.selectedItem) {
                      this.interventions.contracted_surface = event.selectedItem.contracted_surface;
                      this.interventions.actual_surface = event.selectedItem.actual_surface;
                      this.interventions.remaining_surface = event.selectedItem.remaining_surface;
                      this.stwOptions = {
                        max: this.interventions.contracted_surface,
                        min: 0,
                        value: this.interventions.contracted_surface,
                        /*onValueChanged: (stwEvent) => {
                          if (this.interventions.contracted_surface && (stwEvent.value > this.interventions.contracted_surface )) {
                            this.stwOptions.value = {
                              min: 0,
                              value: this.interventions.contracted_surface,
                            };
                            console.log(stwEvent);
                            this.toastr.warning('La valeur que vous avez saisie dépasse la valeur de la superficie contractée.');
                          }
                        }*/
                      };
                      this.wareHouseService.getWarehousesByZone(event.selectedItem.id_zone).subscribe(
                        (cds: any) => {
                          this.CDs = cds.data;
                          this.cdOptions = {
                            displayExpr: 'name',
                            valueExpr: 'id',
                            items: this.CDs,
                            searchEnabled: true,
                            searchMode: 'contains',
                          };
                        }
                      );
                    }
                  },
                };
              }
            );
          }
        );
        /*-------------------------------------------------------------------------*/
        this.interventionService.getInterventionCustomFields(qps.sub_family_id)
          .subscribe(
            (res: any) => {
              this.custom_fields = res.data ? res.data : [];
              this.custom_fields.forEach((cf: any) => {
                const dxCustomField = {
                  dataField: cf.name,
                  label: cf.label,
                  required: cf.required,
                  editorType: this.DX_TEXT_BOX,
                  colspan: 3,
                };
                switch (cf.type) {
                  case (this.DB_NUMBER_BOX) : {
                    dxCustomField.editorType = this.DX_NUMBER_BOX;
                    dxCustomField.colspan = 2;
                    break;
                  }
                  case (this.DB_CHECK_BOX) : {
                    dxCustomField.editorType = this.DX_CHECK_BOX;
                    dxCustomField.colspan = 1;
                    break;
                  }
                }
                this.DX_custom_fields.push(dxCustomField);
              });
              this.DX_custom_fields = this.DX_custom_fields.sort((cf1, cf2) => {
                if (cf1.colspan > cf2.colspan) {
                  return 1;
                }
                if (cf1.colspan < cf2.colspan) {
                  return -1;
                }
                return 0;
              });
            }
          );
      }
    );


    /*--------------------------------------------------------*/

    this.semenceCategoryOptions = {
      displayExpr: 'category_name',
      valueExpr: 'category_id',
      items: this.data.semence,
      searchEnabled: true,
      onSelectionChanged: (event) => {
        this.SelectedSemenceCategory = event.selectedItem;
        this.semenceSubCategoryOptions = {
          displayExpr: 'sub_category_name',
          valueExpr: 'sub_category_id',
          items: this.data.semence[0].sub_categories,
          searchEnabled: true,
          onSelectionChanged: (e) => {
            this.SelectedSemenceSubCategory = e.selectedItem;
            this.articleService.getArticlesByFamily(e.selectedItem.sub_category_id)
              .subscribe(
                (articles: any) => {
                  this.semenceArticleOptions = {
                    displayExpr: 'name',
                    valueExpr: 'id',
                    items: articles.data,
                    searchEnabled: true,
                    onSelectionChanged: (ev) => {
                      this.SelectedSemenceArticle = ev.selectedItem;
                      this.semenceQuantityOptions = {
                        value: this.interventions.surface_to_work * (+this.SelectedSemenceArticle.dose),
                        onValueChanged: (cc) => {
                          this.SemenceQuantity = cc.value;
                        }
                      };
                    }
                  };
                }
              );
          },
        };
      },
    };

    this.addSemance = {
      text: 'AJOUTER',
      type: 'default',
      useSubmitBehavior: false,
      onClick: () => {
        console.log(this.SelectedSemenceCategory,
          this.SelectedSemenceSubCategory,
          this.SelectedSemenceArticle,
          this.SemenceQuantity
        );
        if (!this.SelectedSemenceCategory
          || !this.SelectedSemenceSubCategory
          || !this.SelectedSemenceArticle
          || !this.SemenceQuantity) {
          NewComponent.notifyMe('Veuillez remplir tous les champs');
          return -1;
        }
        try {
          this.semenceGrid.instance.getVisibleRows().forEach((row: any) => {
            if (row.data.article.name === this.SelectedProductsArticle.name
              && row.data.category.category_name === this.SelectedProductsCategory.category_name
              && row.data.sub_category.sub_category_name === this.SelectedProductsSubCategory.sub_category_name
              && row.data.quantity === this.productsQuantity) {
              const msg = 'Vous avez déjà sélectionné un article de la même famille et la même quantité.';
              NewComponent.notifyMe(msg);
              throw new Error(msg);
            }
          });
        } catch (e) {
          throw e;
        }
        this.semences.push({
          'category': this.SelectedSemenceCategory,
          'sub_category': this.SelectedSemenceSubCategory,
          'article': this.SelectedSemenceArticle,
          'quantity': this.SemenceQuantity
        });
      }
    };

    /*--------------------------------------------------------*/

    this.productsCategoryOptions = {
      displayExpr: 'category_name',
      valueExpr: 'category_id',
      items: this.data.products,
      searchEnabled: true,
      onSelectionChanged: (event) => {
        this.SelectedProductsCategory = event.selectedItem;
        this.productsSubCategoryOptions = {
          displayExpr: 'sub_category_name',
          valueExpr: 'sub_category_id',
          items: this.data.products[0].sub_categories,
          searchEnabled: true,
          onSelectionChanged: (e) => {
            this.SelectedProductsSubCategory = e.selectedItem;
            this.articleService.getArticlesByFamily(e.selectedItem.sub_category_id)
              .subscribe(
                (articles: any) => {
                  this.productsArticleOptions = {
                    displayExpr: 'name',
                    valueExpr: 'id',
                    items: articles.data,
                    searchEnabled: true,
                    onSelectionChanged: (ev) => {
                      this.SelectedProductsArticle = ev.selectedItem;
                      this.productsQuantityOptions = {
                        value: this.interventions.surface_to_work * (+this.SelectedProductsArticle.dose),
                        onValueChanged: (vv) => {
                          this.productsQuantity = vv.value;
                        }
                      };
                    }
                  };
                }
              );
          },
        };
      },
    };

    this.addProduct = {
      text: 'AJOUTER',
      type: 'default',
      useSubmitBehavior: false,
      onClick: () => {
        if (!this.SelectedProductsCategory
          || !this.SelectedProductsSubCategory
          || !this.SelectedProductsArticle
          || !this.productsQuantity) {
          NewComponent.notifyMe('Veuillez remplir tous les champs');
          return -1;
        }
        try {
          this.productsGrid.instance.getVisibleRows().forEach((row: any) => {
            if (row.data.article.name === this.SelectedProductsArticle.name
              && row.data.category.category_name === this.SelectedProductsCategory.category_name
              && row.data.sub_category.sub_category_name === this.SelectedProductsSubCategory.sub_category_name
              && row.data.quantity === this.productsQuantity) {
              const msg = 'Vous avez déjà sélectionné un article de la même famille et la même quantité.';
              NewComponent.notifyMe(msg);
              throw new Error(msg);
            }
          });
        } catch (e) {
          throw e;
        }

        this.products.push({
          'category': this.SelectedProductsCategory,
          'sub_category': this.SelectedProductsSubCategory,
          'article': this.SelectedProductsArticle,
          'quantity': this.productsQuantity
        });
      }
    };

    /*--------------------------------------------------------*/
    this.buttonsave = {
      text: 'Enregistrer',
      type: 'success',
      useSubmitBehavior: true,
      icon: 'fa fa-save',
      onClick: ($event) => {
        /*--------------------------------------------------------*/
        if (((!this.productsGrid && !this.data.services.length && this.semenceGrid) &&
            this.semenceGrid.instance.getVisibleRows().length === 0)
          || ((!this.semenceGrid && !this.data.services.length && this.productsGrid) &&
            this.productsGrid.instance.getVisibleRows().length === 0)
          || ((!this.semenceGrid && !this.productsGrid && this.selectedItems) && this.selectedItems.length === 0)) {
          NewComponent.notifyMe('Aucun produit ou service n\'a été choisi.');
          return -1;
        }
        /*--------------------------------------------------------*/
        const data = {
          third_party_id: this.third.id,
          request_type_id: this.request_type_id,
          logical_parcel_id: this.interventions.logical_parcel,
          surface_to_work: this.interventions.surface_to_work,
          warehouse_id: this.interventions.warehouse,
          description: this.interventions.description,
          isSaveAsModel: this.interventions.isSaveAsModel,
          model_name: this.interventions.model_name,
          date: this.interventions.scheduled_date,
          is_model_visible_to_all: !!this.interventions.model_visibility,
          semence_articles: [],
          product_articles: [],
          service_articles: [],
          custom_fields: []
        };

        this.DX_custom_fields.forEach(
          cf1 => {
            const obj = {};
            obj[cf1.dataField] = this.custom_fields_form_data[cf1.dataField];
            data.custom_fields.push(obj);
          }
        );

        if (this.semenceGrid) {
          this.semenceGrid.instance.getVisibleRows().forEach(row => {
            data.semence_articles.push({
              article_id: row.data.article.id,
              quantity: row.data.quantity,
            });
          });
        }

        if (this.productsGrid) {
          this.productsGrid.instance.getVisibleRows().forEach(row => {
            data.product_articles.push({
              article_id: row.data.article.id,
              quantity: row.data.quantity,
            });
          });
        }

        this.selectedItems.forEach(
          st => {
            data.service_articles.push({article_id: st.id, quantity: 1});
          }
        );
        if (this.interventions.isSaveAsModel
          && !this.interventions.model_name) {
          NewComponent.notifyMe('Veuillez entrer un nom de modèle ou bien désactiver l\'option \'Enregistrer comme modèle\'');
          return -1;
        }
        /*--------------------------------------------------------*/
        if (!data.logical_parcel_id
          || !data.date
          || data.surface_to_work === null
          || !data.warehouse_id) {
          NewComponent.notifyMe('Veuillez remplir tous les champs obligatoires.');
          return -1;
        }

        try {
          this.DX_custom_fields.forEach(cf => {
            if (!this.custom_fields_form_data[cf.dataField] && cf.required) {
              const msg = 'Veuillez remplir tous les champs obligatoires.';
              NewComponent.notifyMe(msg);
              throw new Error(msg);
            }
          });
        } catch (e) {
          throw e;
        }


        /*--------------------------------------------------------*/

        this.loadingVisible = true;
        this.interventionService.addInterventionRequest(data).subscribe(
          (value: any) => {
            this.loadingVisible = false;
            NewComponent.notifyMe('La demande d\'intervention a été traitée avec succès, Redirection.........', 'success');
            this.router.navigate([`/preconisations-intrants/liste`])
              .catch(err => {
                throw err;
              });
          },
          (error: any) => {
            this.loadingVisible = false;
            NewComponent.notifyMe('Une erreur s\'est produite, veuillez réessayer dans quelques secondes.', 'error');
          }
        );

      }
    };
    this.buttoncancel = {
      text: 'Annuler',
      type: 'danger',
      icon: 'fa fa-undo',
      useSubmitBehavior: true,
      onClick: () => {
        NewComponent.notifyMe('la demande d\'intervention a été annulée, Redirection....', 'success');
        setTimeout(() => {
          this.router.navigate(['/interventions/selectionner'])
            .catch(err => {
              throw err;
            });
        }, 3000);

      }
    };
    this.saveAsModelOptions = {
      onText: 'Oui',
      offText: 'Non',
      useSubmitBehavior: false,
      onValueChanged: (event) => {
        this.saveAsModel = !this.saveAsModel;
      }
    };

  }

  /*-------------------------------------------*/

}
