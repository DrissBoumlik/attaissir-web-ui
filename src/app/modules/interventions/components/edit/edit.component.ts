import {Component, OnInit, ViewChild} from '@angular/core';
import {ArticlesService} from '../../../articles/services/articles.service';
import 'rxjs/add/operator/toPromise';
import {InterventionService} from '../../services/intervention.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ThirdsService} from '../../../thirds/services/thirds.service';
import {WarehouseService} from '../../../distribution-center/services/warehouse.service';
import {DxDataGridComponent} from 'devextreme-angular';
import {NewComponent} from '../new/new.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


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
  // third: any;
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
  SelectedSemenceArticle: any;
  SemenceQuantity: any;
  /*-------------------------------------------*/
  productsCategoryOptions: any;
  productsSubCategoryOptions: any;
  productsArticleOptions: any;
  SelectedProductsCategory: any;
  SelectedProductsSubCategory: any;
  SelectedProductsArticle: any;
  productsQuantity: any;
  /*-------------------------------------------*/
  @ViewChild('semenceGrid') semenceGrid: DxDataGridComponent;
  @ViewChild('productsGrid') productsGrid: DxDataGridComponent;
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
  custom_fields = [
    {ID: 1, type: 'text', label: 'custom label1', name: 'custom_field_1', required: false},
    {ID: 2, type: 'number', label: 'custom label2', name: 'custom_field_2', required: true},
    {ID: 3, type: 'checkbox', label: 'custom label3', name: 'custom_field_3', required: true},
    {ID: 4, type: 'text', label: 'custom label4', name: 'custom_field_4', required: false},
    {ID: 5, type: 'checkbox', label: 'custom label5', name: 'custom_field_5', required: true}
  ];
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

  /*-------------------------------------------*/

  constructor(public articleService: ArticlesService,
              public interventionService: InterventionService,
              private wareHouseService: WarehouseService,
              private route: ActivatedRoute,
              private thirdsService: ThirdsService,
              private router: Router) {


  }

  /*-------------------------------------------*/

  ngOnInit() {
    const routParamsId = +this.route.snapshot.params['id'];
    this.interventionService.getInterventionById(routParamsId).subscribe(
      response => {
        console.log(response.data);
        this.interventions = response.data;
      },
      err => {

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
                    }
                  };
                }
              );
          },
        };
      },
    };
    this.semenceQuantityOptions = {
      onValueChanged: (e) => {
        this.SemenceQuantity = e.value;
      }
    };
    this.addSemance = {
      text: 'AJOUTER',
      type: 'default',
      useSubmitBehavior: false,
      onClick: () => {
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
                    }
                  };
                }
              );
          },
        };
      },
    };
    this.productsQuantityOptions = {
      onValueChanged: (e) => {
        this.productsQuantity = e.value;
      }
    };
    this.addProduct = {
      text: 'AJOUTER',
      type: 'default',
      useSubmitBehavior: false,
      onClick: () => {
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
        console.log(this.interventions);
        /*--------------------------------------------------------*/
        if (this.semenceGrid.instance.getVisibleRows().length === 0
          && this.productsGrid.instance.getVisibleRows().length === 0
          && this.selectedItems.length === 0) {
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

        this.semenceGrid.instance.getVisibleRows().forEach(row => {
          data.semence_articles.push({
            article_id: row.data.article.id,
            quantity: row.data.quantity,
          });
        });
        this.productsGrid.instance.getVisibleRows().forEach(row => {
          data.product_articles.push({
            article_id: row.data.article.id,
            quantity: row.data.quantity,
          });
        });
        this.selectedItems.forEach(
          st => {
            data.service_articles.push({article_id: st.id, quantity: 1});
          }
        );
        if (this.interventions.isSaveAsModel
          && !this.interventions.model_name) {
          NewComponent.notifyMe('veuillez entrer un nom de modèle ou bien désactiver l\'option \'Enregistrer comme modèle\'');
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
              NewComponent.notifyMe('Veuillez remplir tous les champs obligatoires.');
              throw new Error('Veuillez remplir tous les champs obligatoires.');
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
            this.router.navigate([`/mouvements/afficher/${value.data.stock_operation_id}`])
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
}
