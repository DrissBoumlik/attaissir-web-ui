import {Component, OnInit, ViewChild} from '@angular/core';
import {ArticlesService} from '../../../articles/services/articles.service';
import 'rxjs/add/operator/toPromise';
import {InterventionService} from '../../services/intervention.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ThirdsService} from '../../../thirds/services/thirds.service';
import {DxDataGridComponent} from 'devextreme-angular';
import {NewComponent} from '../new/new.component';
import {DxiItemComponent} from 'devextreme-angular/ui/nested/item-dxi';
import {ToastrService} from 'ngx-toastr';
import {WarehouseService} from '../../../warehouse/service/warehose.service';
import {Helper} from '../../../../shared/classes/helper';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  /*-------------------------------------------*/
  buttonsave: any;
  buttoncancel: any;
  filterButton: any;
  /*-------------------------------------------*/
  addSemance: any;
  addProduct: any;
  addAP: any;
  addBTR: any;
  addEquipment: any;
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
  apis: any = [];
  btrs: any = [];
  equipments: any = [];
  saveAsModel = false;
  /*-------------------------------------------*/
  semenceCategoryOptions: any;
  semenceSubCategoryOptions: any;
  semenceArticleOptions: any;
  SelectedSemenceCategory: any;
  SelectedSemenceSubCategory: any;
  SelectedSemenceArticle: any = {};
  SemenceQuantity: any;
  /*--------------------Camion List options-----------------------*/
  CLOptions: any;
  /*-------------------------------------------*/
  productsCategoryOptions: any;
  productsSubCategoryOptions: any;
  productsArticleOptions: any;
  SelectedProductsCategory: any;
  SelectedProductsSubCategory: any;
  SelectedProductsArticle: any = {};
  productsQuantity: any;
  /*-------------------------------------------*/
  APCategoryOptions: any;
  APSubCategoryOptions: any;
  APArticleOptions: any;
  SelectedAPsCategory: any;
  SelectedAPSubCategory: any;
  SelectedAPArticle: any = {};
  APQuantity: any;
  APQuantityOptions;
  /*-------------------------------------------*/
  BTRCategoryOptions: any;
  BTRSubCategoryOptions: any;
  BTRArticleOptions: any;
  SelectedBTRsCategory: any;
  SelectedBTRSubCategory: any;
  SelectedBTRArticle: any = {};
  BTRQuantity: any;
  BTRQuantityOptions;
  /*-------------------------------------------*/
  EquipmentCategoryOptions: any;
  EquipmentSubCategoryOptions: any;
  EquipmentArticleOptions: any;
  SelectedEquipmentsCategory: any;
  SelectedEquipmentSubCategory: any;
  SelectedEquipmentArticle: any = {};
  EquipmentQuantity: any;
  EquipmentQuantityOptions;
  /*-------------------------------------------*/
  @ViewChild('semenceGrid') semenceGrid: DxDataGridComponent;
  @ViewChild('productsGrid') productsGrid: DxDataGridComponent;
  @ViewChild('apiGrid') apiGrid: DxDataGridComponent;
  @ViewChild('btrGrid') btrGrid: DxDataGridComponent;
  @ViewChild('equipmentGrid') equipmentGrid: DxDataGridComponent;
  /*-------------------------------------------*/
  @ViewChild('choixSemence') choixSemence: DxiItemComponent;
  @ViewChild('choixProducts') choixProducts: DxiItemComponent;
  @ViewChild('choixServices') choixServices: DxiItemComponent;
  @ViewChild('logicalParcel') logicalParcel: DxiItemComponent;
  /*-------------------------------------------*/
  data = {
    semence: [],
    products: [],
    services: [],
    api: [],
    btr: [],
    equipments: [],
    autre: []
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
  DB_SELECT_BOX = 'select';
  /*-----------------CONSTANTS--------------------------*/
  DX_TEXT_BOX = 'dxTextBox';
  DX_NUMBER_BOX = 'dxNumberBox';
  DX_CHECK_BOX = 'dxCheckBox';
  DX_SELECT_BOX = 'dxSelectBox';
  /*-----------------CONSTANTS--------------------------*/
  SEMENCE_TYPE = 'SEME';
  PRODUCT_TYPE = 'product';
  SERVICE_TYPE = 'service';
  BTR_TYPE = 'BTR';
  EQUIPMENT_TYPE = 'EQMA';
  AVANCES_ET_PRIMES_TYPE = 'API';

  /*--------------------Popups-----------------------*/
  parcelGridPopup = false;
  parcels = [];
  /*--------------------Templates-----------------------*/
  templates: any[] = [];
  templateEditorOptions: any;
  selectedTemplate: any;
  /*--------------------Constructor-----------------------*/
  helper: any;
  global_type = {
    parcel: true,
    dc: true,
    camion: false,
    proposition: true,
  };

  constructor(public articleService: ArticlesService,
              public interventionService: InterventionService,
              private wareHouseService: WarehouseService,
              private route: ActivatedRoute,
              private thirdsService: ThirdsService,
              private toastr: ToastrService,
              private router: Router) {
    this.helper = Helper;
  }

  /*--------------------Initialize content-----------------------*/
  ngOnInit() {
    /*this.cdOptions = {
      displayExpr: 'name',
      valueExpr: 'id',
      dataSource: new CustomStore({
        load: (loadOptions: any) => {
          return this.wareHouseService.getWarehousesDx(loadOptions)
            .toPromise()
            .then(response => {
              const json = response;
              return json;
            })
            .catch(error => {
              throw error;
            });
        },
      }),
      searchEnabled: true,
      searchMode: 'contains',
    };*/
    this.route.queryParams.subscribe(
      (qps: any) => {
        this.loadingVisible = true;
        /*-------------------------------------------------------------------------*/
        this.request_type_id = qps.sub_family_id;
        this.interventionService.getPropositionTemplates(qps.third_party_id, qps.sub_family_id)
          .subscribe(
            (templates: any) => {
              this.templates = templates.data.length ? templates.data : [];
              this.templateEditorOptions = {
                displayExpr: 'template_name',
                valueExpr: 'id',
                items: this.templates,
                searchEnabled: true,
                searchMode: 'contains',
                onSelectionChanged: (event) => {
                  this.selectedTemplate = event.selectedItem;
                  this.semences = [];
                  this.products = [];
                  this.selectedItems = [];
                  if (this.selectedTemplate) {
                    this.interventionService.getTemplateData(this.interventions.warehouse,
                      this.interventions.surface_to_work, this.selectedTemplate.id)
                      .subscribe(
                        (templateData: any) => {
                          console.log(templateData);
                          const sm = templateData.data.articles.semences;
                          const sr = templateData.data.articles.service;
                          const pd = templateData.data.articles.product;
                          const custom_fields = templateData.data.custom_fields;
                          if (sm) {
                            sm.forEach((semence: any) => {
                              this.semences.push({
                                'category': {category_name: semence.category},
                                'sub_category': {sub_category_name: semence.sub_category},
                                'article': {id: semence.id, name: semence.article_name},
                                'quantity': semence.quantity
                              });
                            });
                          }
                          if (pd) {
                            pd.forEach((product: any) => {
                              this.products.push({
                                'category': {category_name: product.category},
                                'sub_category': {sub_category_name: product.sub_category},
                                'article': {id: product.id, name: product.article_name},
                                'quantity': product.quantity
                              });
                            });
                          }
                          if (sr) {
                            this.prestations.forEach(prestation => {
                              sr.forEach((service: any) => {
                                if (service.id === prestation.id) {
                                  this.selectedItems.push(prestation);
                                }
                              });
                            });
                          }
                          if (custom_fields) {
                            custom_fields.forEach((cf: any) => {
                              this.DX_custom_fields.forEach(custom => {
                                if (cf[custom.dataField]) {
                                  custom.editorOptions = {
                                    placeholder: custom.label,
                                    value: cf[custom.dataField],
                                  };
                                }
                              });
                            });
                          }
                        }
                      );
                  }
                },
              };
            }
          );
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
                    if (type.name === this.AVANCES_ET_PRIMES_TYPE) {
                      this.data.api.push(ctg);
                    }
                    if (type.name === this.EQUIPMENT_TYPE) {
                      this.data.equipments.push(ctg);
                    }
                    if (type.name === this.BTR_TYPE) {
                      this.data.btr.push(ctg);
                    }
                  });
                  this.data.services.forEach(cat => {
                    cat.sub_categories.forEach(subcat => {
                      this.interventionService.getServiceArticlesBySubCatID(this.request_type_id)
                        .subscribe((ars: any) => {
                          ars.data.forEach(
                            (ar: any) => {
                              let check_if_exist = false;
                              check_if_exist = this.prestations.find((pp: any) => {
                                return pp.id === ar.id;
                              });
                              if (!check_if_exist) {
                                this.prestations.push({
                                  id: ar.id,
                                  text: ar.name,
                                });
                              }
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
            this.loadingVisible = false;
            this.third = tier.data;
            this.interventions.third = this.third;
            this.interventionService.getLogicalParcelsByUserId(qps.third_party_id).subscribe(
              (parcels: any) => {
                console.log(parcels);
                this.third.parcels = [];
                this.parcels = parcels.data;
                this.parcels['name'] = parcels.data.code_ormva;
                this.parcels = this.parcels.map(parcel => {
                  this.interventionService.getCDAByZone(parcel.zone_id).subscribe(
                    (res: any) => {
                      parcel.cda_name = res.data[0].cda_name;
                    }
                  );
                  return parcel;
                });
                parcels.data.forEach(parcel => {
                  this.third.parcels.push(
                    {
                      id: parcel.id,
                      label: parcel.code_ormva,
                      contracted_surface: parcel.annuel_surface,
                      actual_surface: parcel.annuel_surface,
                      remaining_surface: parcel.abandoned_surface,
                      id_zone: parcel.zone_id ? parcel.zone_id : 2
                    },
                  );
                });
                this.parcelOptions = {
                  displayExpr: 'label',
                  valueExpr: 'id',
                  items: this.third.parcels,
                  searchEnabled: true,
                  searchMode: 'contains',
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

        /*-------------------------------------------------------------------------*/
        this.interventionService.getInterventionCustomFields(qps.sub_family_id)
          .subscribe(
            (res: any) => {
              this.global_type = {
                parcel: res.data.params.parcel ? JSON.parse(res.data.params.parcel) : this.global_type.parcel,
                dc: res.data.params.dc ? JSON.parse(res.data.params.dc) : this.global_type.dc,
                camion: res.data.params.camion ? JSON.parse(res.data.params.camion) : this.global_type.camion,
                proposition: res.data.params.proposition ? JSON.parse(res.data.params.proposition) : this.global_type.proposition,
              };
              console.log(this.global_type);
              this.custom_fields = res.data.fields ? res.data.fields : [];
              this.custom_fields.forEach((cf: any) => {
                const dxCustomField = {
                  dataField: cf.name,
                  label: cf.label,
                  required: cf.required,
                  editorType: this.DX_TEXT_BOX,
                  editorOptions: {
                    placeholder: cf.label,
                    displayExpr: 'label',
                    valueExpr: 'id',
                    items: null,
                    searchEnabled: true,
                    searchMode: 'contains',
                  },
                  colspan: 3,
                };
                switch (cf.type) {
                  case (this.DB_NUMBER_BOX): {
                    dxCustomField.editorType = this.DX_NUMBER_BOX;
                    dxCustomField.colspan = 2;
                    break;
                  }
                  case (this.DB_CHECK_BOX): {
                    dxCustomField.editorType = this.DX_CHECK_BOX;
                    dxCustomField.colspan = 1;
                    break;
                  }
                  case (this.DB_SELECT_BOX): {
                    dxCustomField.editorType = this.DX_SELECT_BOX;
                    dxCustomField.colspan = 1;
                    if (this.global_type.camion) {
                      this.interventionService.getCamionsList().subscribe(
                        (list: any) => {
                          dxCustomField.editorOptions = {
                            placeholder: cf.label,
                            displayExpr: 'ridelle_code',
                            valueExpr: 'id',
                            items: list,
                            searchEnabled: true,
                            searchMode: 'contains',
                          };
                        });
                    }
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
      searchMode: 'contains',
      onSelectionChanged: (event) => {
        this.SelectedSemenceCategory = event.selectedItem;
        this.semenceSubCategoryOptions = {
          displayExpr: 'sub_category_name',
          valueExpr: 'sub_category_id',
          items: this.data.semence[0].sub_categories,
          searchEnabled: true,
          searchMode: 'contains',
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
                    searchMode: 'contains',
                    onSelectionChanged: (ev) => {
                      this.SelectedSemenceArticle = ev.selectedItem;
                      this.SemenceQuantity = this.interventions.surface_to_work * (+this.SelectedSemenceArticle.dose);
                      this.semenceQuantityOptions = {
                        format: '#0.## ' + this.SelectedSemenceArticle.unit.toString(),
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
    this.APCategoryOptions = {
      displayExpr: 'category_name',
      valueExpr: 'category_id',
      items: this.data.api,
      searchEnabled: true,
      searchMode: 'contains',
      onSelectionChanged: (event) => {
        this.SelectedAPsCategory = event.selectedItem;
        this.APSubCategoryOptions = {
          displayExpr: 'sub_category_name',
          valueExpr: 'sub_category_id',
          items: this.data.api[0].sub_categories,
          searchEnabled: true,
          searchMode: 'contains',
          onSelectionChanged: (e) => {
            this.SelectedAPSubCategory = e.selectedItem;
            this.articleService.getArticlesByFamily(e.selectedItem.sub_category_id)
              .subscribe(
                (articles: any) => {
                  this.APArticleOptions = {
                    displayExpr: 'name',
                    valueExpr: 'id',
                    items: articles.data,
                    searchEnabled: true,
                    searchMode: 'contains',
                    onSelectionChanged: (ev) => {
                      this.SelectedAPArticle = ev.selectedItem;
                      this.APQuantity = this.interventions.surface_to_work * (+this.SelectedAPArticle.dose);
                      this.APQuantityOptions = {
                        format: '#0.## ' + this.SelectedAPArticle.unit.toString(),
                        disabled: this.SelectedAPArticle.code !== 'GAF001',
                        value: this.interventions.surface_to_work * (+this.SelectedAPArticle.dose),
                        onValueChanged: (cc) => {
                          this.APQuantity = cc.value;
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
    this.BTRCategoryOptions = {
      displayExpr: 'category_name',
      valueExpr: 'category_id',
      items: this.data.btr,
      searchEnabled: true,
      searchMode: 'contains',
      onSelectionChanged: (event) => {
        this.SelectedBTRsCategory = event.selectedItem;
        this.BTRSubCategoryOptions = {
          displayExpr: 'sub_category_name',
          valueExpr: 'sub_category_id',
          items: this.data.btr[0].sub_categories,
          searchEnabled: true,
          searchMode: 'contains',
          onSelectionChanged: (e) => {
            this.SelectedBTRSubCategory = e.selectedItem;
            this.articleService.getArticlesByFamily(e.selectedItem.sub_category_id)
              .subscribe(
                (articles: any) => {
                  this.BTRArticleOptions = {
                    displayExpr: 'name',
                    valueExpr: 'id',
                    items: articles.data,
                    searchEnabled: true,
                    searchMode: 'contains',
                    onSelectionChanged: (ev) => {
                      this.SelectedBTRArticle = ev.selectedItem;
                      this.BTRQuantity = this.interventions.surface_to_work * (+this.SelectedAPArticle.dose);
                      this.BTRQuantityOptions = {
                        format: '#0.## ' + this.SelectedBTRArticle.unit.toString(),
                        value: this.interventions.surface_to_work * (+this.SelectedBTRArticle.dose),
                        onValueChanged: (cc) => {
                          this.BTRQuantity = cc.value;
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
    this.EquipmentCategoryOptions = {
      displayExpr: 'category_name',
      valueExpr: 'category_id',
      items: this.data.equipments,
      searchEnabled: true,
      searchMode: 'contains',
      onSelectionChanged: (event) => {
        this.SelectedEquipmentsCategory = event.selectedItem;
        this.EquipmentSubCategoryOptions = {
          displayExpr: 'sub_category_name',
          valueExpr: 'sub_category_id',
          items: this.data.equipments[0].sub_categories,
          searchEnabled: true,
          searchMode: 'contains',
          onSelectionChanged: (e) => {
            this.SelectedEquipmentSubCategory = e.selectedItem;
            this.articleService.getArticlesByFamily(e.selectedItem.sub_category_id)
              .subscribe(
                (articles: any) => {
                  this.EquipmentArticleOptions = {
                    displayExpr: 'name',
                    valueExpr: 'id',
                    items: articles.data,
                    searchEnabled: true,
                    searchMode: 'contains',
                    onSelectionChanged: (ev) => {
                      this.SelectedEquipmentArticle = ev.selectedItem;
                      this.EquipmentQuantity = this.interventions.surface_to_work * (+this.SelectedEquipmentArticle.dose);
                      this.EquipmentQuantityOptions = {
                        format: '#0.## ' + this.SelectedEquipmentArticle.unit.toString(),
                        value: this.interventions.surface_to_work * (+this.SelectedEquipmentArticle.dose),
                        onValueChanged: (cc) => {
                          this.EquipmentQuantity = cc.value;
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
    this.productsCategoryOptions = {
      displayExpr: 'category_name',
      valueExpr: 'category_id',
      items: this.data.products,
      searchEnabled: true,
      value: this.data.products[0],
      selectedItem: this.data.products[0],
      deferRendering: false,
      searchMode: 'contains',
      onSelectionChanged: (event) => {
        console.log(event);
        this.SelectedProductsCategory = event.selectedItem;
        this.productsSubCategoryOptions = {
          displayExpr: 'sub_category_name',
          valueExpr: 'sub_category_id',
          items: event.selectedItem.sub_categories,
          searchEnabled: true,
          searchMode: 'contains',
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
                    searchMode: 'contains',
                    onSelectionChanged: (ev) => {
                      this.SelectedProductsArticle = ev.selectedItem;
                      this.productsQuantity = this.interventions.surface_to_work * (+this.SelectedProductsArticle.dose);
                      this.productsQuantityOptions = {
                        format: '#0.## ' + this.SelectedProductsArticle.unit.toString(),
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
    /*--------------------------------------------------------*/
    this.addSemance = {
      text: 'AJOUTER',
      type: 'default',
      useSubmitBehavior: false,
      onClick: () => {
        if (this.global_type.parcel && !this.interventions.logical_parcel) {
          NewComponent.notifyMe('Merci de sélectionner une parcelle');
          return -1;
        }
        if (!this.SelectedSemenceCategory
          || !this.SelectedSemenceSubCategory
          || !this.SelectedSemenceArticle
          || !this.SemenceQuantity) {
          NewComponent.notifyMe('Veuillez remplir tous les champs');
          return -1;
        }
        this.loadingVisible = true;
        this.articleService
          .checkPlafonnement(this.third.id, this.SelectedSemenceArticle)
          .subscribe(
            (res: any) => {
              this.loadingVisible = false;
              const stw = parseFloat(this.interventions.surface_to_work);
              const limit = parseFloat(res.data.limit.dose) * res.data.limit.plf * stw;
              const desired_quantity = parseFloat(this.SemenceQuantity);
              const pr_quantity = parseFloat(res.data.quantity);
              const plf_quan = limit - pr_quantity;
              if (desired_quantity > plf_quan && limit !== 0) {
                NewComponent.notifyMe('Vous avez dépassé la quantité allouée pour cet article, veuillez réviser la quantité demandée ou bien contactez la DSI.', 'warning', 3000);
                return -1;
              }

              try {
                this.semenceGrid.instance.getVisibleRows().forEach((row: any) => {
                  if (row.data.article.name === this.SelectedSemenceArticle.name
                    && row.data.category.category_name === this.SelectedSemenceCategory.category_name
                    && row.data.sub_category.sub_category_name === this.SelectedSemenceSubCategory.sub_category_name
                    && row.data.quantity === this.SemenceQuantity) {
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
            }, (err: any) => {
              this.loadingVisible = false;
              console.log(err);
            }
          );
      }
    };
    this.addAP = {
      text: 'AJOUTER',
      type: 'default',
      useSubmitBehavior: false,
      onClick: () => {
        if (this.global_type.parcel && !this.interventions.logical_parcel) {
          NewComponent.notifyMe('Merci de sélectionner une parcelle');
          return -1;
        }
        if (!this.SelectedAPsCategory
          || !this.SelectedAPSubCategory
          || !this.SelectedAPArticle
          || !this.APQuantity) {
          NewComponent.notifyMe('Veuillez remplir tous les champs');
          return -1;
        }
        this.loadingVisible = true;
        this.articleService
          .checkPlafonnement(this.third.id, this.SelectedAPArticle)
          .subscribe(
            (res: any) => {
              this.loadingVisible = false;
              const stw = parseFloat(this.interventions.surface_to_work);
              const limit = parseFloat(res.data.limit.dose) * res.data.limit.plf * stw;
              const desired_quantity = parseFloat(this.APQuantity);
              const pr_quantity = parseFloat(res.data.quantity);
              const plf_quan = limit - pr_quantity;
              if (desired_quantity > plf_quan) {
                NewComponent.notifyMe('Vous avez dépassé la quantité allouée pour cet article, veuillez réviser la quantité demandée ou bien contactez la DSI.', 'warning', 3000);
                return -1;
              }
              try {
                this.apiGrid.instance.getVisibleRows().forEach((row: any) => {
                  if (row.data.article.name === this.SelectedAPArticle.name
                    && row.data.category.category_name === this.SelectedAPsCategory.category_name
                    && row.data.sub_category.sub_category_name === this.SelectedAPSubCategory.sub_category_name
                    && row.data.quantity === this.APQuantity) {
                    const msg = 'Vous avez déjà sélectionné un article de la même famille et la même quantité.';
                    NewComponent.notifyMe(msg);
                    throw new Error(msg);
                  }
                });
              } catch (e) {
                throw e;
              }
              this.apis.push({
                'category': this.SelectedAPsCategory,
                'sub_category': this.SelectedAPSubCategory,
                'article': this.SelectedAPArticle,
                'quantity': this.APQuantity
              });
            }, (err: any) => {
              this.loadingVisible = false;
              console.log(err);
            });
      }
    };
    this.addBTR = {
      text: 'AJOUTER',
      type: 'default',
      useSubmitBehavior: false,
      onClick: () => {
        if (this.global_type.parcel && !this.interventions.logical_parcel) {
          NewComponent.notifyMe('Merci de sélectionner une parcelle');
          return -1;
        }
        if (!this.SelectedBTRsCategory
          || !this.SelectedBTRSubCategory
          || !this.SelectedBTRArticle
          || !this.BTRQuantity) {
          NewComponent.notifyMe('Veuillez remplir tous les champs');
          return -1;
        }
        this.loadingVisible = true;
        this.articleService
          .checkPlafonnement(this.third.id, this.SelectedBTRArticle)
          .subscribe(
            (res: any) => {
              this.loadingVisible = false;
              const stw = parseFloat(this.interventions.surface_to_work);
              const limit = parseFloat(res.data.limit.dose) * res.data.limit.plf * stw;
              const desired_quantity = parseFloat(this.BTRQuantity);
              const pr_quantity = parseFloat(res.data.quantity);
              const plf_quan = limit - pr_quantity;
              if (desired_quantity > plf_quan) {
                NewComponent.notifyMe('Vous avez dépassé la quantité allouée pour cet article, veuillez réviser la quantité demandée ou bien contactez la DSI.', 'warning', 3000);
                return -1;
              }
              try {
                this.btrGrid.instance.getVisibleRows().forEach((row: any) => {
                  if (row.data.article.name === this.SelectedBTRArticle.name
                    && row.data.category.category_name === this.SelectedBTRsCategory.category_name
                    && row.data.sub_category.sub_category_name === this.SelectedBTRSubCategory.sub_category_name
                    && row.data.quantity === this.BTRQuantity) {
                    const msg = 'Vous avez déjà sélectionné un article de la même famille et la même quantité.';
                    NewComponent.notifyMe(msg);
                    throw new Error(msg);
                  }
                });
              } catch (e) {
                throw e;
              }
              this.btrs.push({
                'category': this.SelectedBTRsCategory,
                'sub_category': this.SelectedBTRSubCategory,
                'article': this.SelectedBTRArticle,
                'quantity': this.BTRQuantity
              });
            }, (err: any) => {
              this.loadingVisible = false;
              console.log(err);
            });
      }
    };
    this.addProduct = {
      text: 'AJOUTER',
      type: 'default',
      useSubmitBehavior: false,
      onClick: () => {
        if (this.global_type.parcel && !this.interventions.logical_parcel) {
          NewComponent.notifyMe('Merci de sélectionner une parcelle');
          return -1;
        }
        if (!this.SelectedProductsCategory
          || !this.SelectedProductsSubCategory
          || !this.SelectedProductsArticle
          || !this.productsQuantity) {
          NewComponent.notifyMe('Veuillez remplir tous les champs');
          return -1;
        }
        this.loadingVisible = true;
        this.articleService
          .checkPlafonnement(this.third.id, this.SelectedProductsArticle)
          .subscribe(
            (res: any) => {
              this.loadingVisible = false;
              const stw = parseFloat(this.interventions.surface_to_work);
              const limit = parseFloat(res.data.limit.dose) * res.data.limit.plf * stw;
              const desired_quantity = parseFloat(this.productsQuantity);
              const pr_quantity = parseFloat(res.data.quantity);
              const plf_quan = limit - pr_quantity;
              if (desired_quantity > plf_quan) {
                NewComponent.notifyMe('Vous avez dépassé la quantité allouée pour cet article, veuillez réviser la quantité demandée ou bien contactez la DSI.', 'warning', 3000);
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
            }, (err: any) => {
              this.loadingVisible = false;
              console.log(err);
            });
      }
    };
    this.addEquipment = {
      text: 'AJOUTER',
      type: 'default',
      useSubmitBehavior: false,
      onClick: () => {
        if (this.global_type.parcel && !this.interventions.logical_parcel) {
          NewComponent.notifyMe('Merci de sélectionner une parcelle');
          return -1;
        }
        if (!this.SelectedEquipmentsCategory
          || !this.SelectedEquipmentSubCategory
          || !this.SelectedEquipmentArticle
          || !this.EquipmentQuantity) {
          NewComponent.notifyMe('Veuillez remplir tous les champs');
          return -1;
        }
        this.loadingVisible = true;
        this.articleService
          .checkPlafonnement(this.third.id, this.SelectedEquipmentArticle)
          .subscribe(
            (res: any) => {
              this.loadingVisible = false;
              const stw = parseFloat(this.interventions.surface_to_work);
              const limit = parseFloat(res.data.limit.dose) * res.data.limit.plf * stw;
              const desired_quantity = parseFloat(this.EquipmentQuantity);
              const pr_quantity = parseFloat(res.data.quantity);
              const plf_quan = limit - pr_quantity;
              if (desired_quantity > plf_quan) {
                NewComponent.notifyMe('Vous avez dépassé la quantité allouée pour cet article, veuillez réviser la quantité demandée ou bien contactez la DSI.', 'warning', 3000);
                return -1;
              }
              try {
                this.equipmentGrid.instance.getVisibleRows().forEach((row: any) => {
                  if (row.data.article.name === this.SelectedEquipmentArticle.name
                    && row.data.category.category_name === this.SelectedEquipmentsCategory.category_name
                    && row.data.sub_category.sub_category_name === this.SelectedEquipmentSubCategory.sub_category_name
                    && row.data.quantity === this.EquipmentQuantity) {
                    const msg = 'Vous avez déjà sélectionné un article de la même famille et la même quantité.';
                    NewComponent.notifyMe(msg);
                    throw new Error(msg);
                  }
                });
              } catch (e) {
                throw e;
              }

              this.equipments.push({
                'category': this.SelectedEquipmentsCategory,
                'sub_category': this.SelectedEquipmentSubCategory,
                'article': this.SelectedEquipmentArticle,
                'quantity': this.EquipmentQuantity
              });
            }, (err: any) => {
              this.loadingVisible = false;
              console.log(err);
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
        if (this.data.services.length || this.data.semence.length || this.data.products.length) {
          if (((!this.productsGrid && !this.data.services.length && this.semenceGrid) &&
            this.semenceGrid.instance.getVisibleRows().length === 0)
            || ((!this.semenceGrid && !this.data.services.length && this.productsGrid) &&
              this.productsGrid.instance.getVisibleRows().length === 0)
            || ((!this.semenceGrid && !this.productsGrid && this.selectedItems) && this.selectedItems.length === 0)) {
            NewComponent.notifyMe('Aucun produit ou service n\'a été choisi.');
            return -1;
          }
        } else if (this.data.api.length && this.apiGrid.instance.getVisibleRows().length === 0) {
          NewComponent.notifyMe('Aucun produit (prime/avance) n\'a été choisi.');
          return -1;
        } else if (this.data.btr.length && this.btrGrid.instance.getVisibleRows().length === 0) {
          NewComponent.notifyMe('Aucun produit (prime/avance) n\'a été choisi.');
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
          api_articles: [],
          btr_articles: [],
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

        if (this.apiGrid) {
          this.apiGrid.instance.getVisibleRows().forEach(row => {
            data.api_articles.push({
              article_id: row.data.article.id,
              quantity: row.data.quantity,
            });
          });
        }
        if (this.btrGrid) {
          this.btrGrid.instance.getVisibleRows().forEach(row => {
            data.btr_articles.push({
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
        if (this.global_type.parcel && (!data.logical_parcel_id
          || !data.date
          || data.surface_to_work === null
          || (!data.warehouse_id && this.global_type.dc))) {
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
            if (error.error.data) {
              NewComponent.notifyMe(error.error.data, 'warning', 5000);
            } else {
              NewComponent.notifyMe('Une erreur s\'est produite, veuillez réessayer dans quelques secondes.', 'error');
            }
          }
        );

      }
    };
    /*--------------------------------------------------------*/
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
    /*--------------------------------------------------------*/
    this.filterButton = {
      text: 'Filtrer',
      type: 'default',
      icon: 'fa fa-filter',
      useSubmitBehavior: false,
      onClick: () => {
        this.parcelGridPopup = true;
      }
    };
    /*--------------------------------------------------------*/
    this.saveAsModelOptions = {
      onText: 'Oui',
      offText: 'Non',
      useSubmitBehavior: false,
      onValueChanged: (event) => {
        this.saveAsModel = !this.saveAsModel;
      }
    };
    /*--------------------------------------------------------*/
  }
  /*-------------------------------------------*/
  selectLogicalParcel(e: any) {
    this.parcelOptions.value = e.id;
    this.logicalParcel.editorOptions = this.parcelOptions;
    this.parcelGridPopup = false;
  }
  /*-------------------------------------------*/
}
