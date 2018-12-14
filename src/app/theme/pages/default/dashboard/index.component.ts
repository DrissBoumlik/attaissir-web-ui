import { NgModule, Component, enableProdMode, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaService } from 'ng2-dragula';
import { WidgetService } from './services/widget-service.service';
import { Helper } from '../../../../shared/classes/helper';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Widget2Component } from './widget/widget2.component';
import { Widget1Component } from './widget/widget1.component';
import { Widget3Component } from './widget/widget3.component';
import { Widget4Component } from './widget/widget4.component';


@Component({
  selector: 'app-dash-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],

})
export class IndexDashComponent {

  @ViewChild(Widget1Component) child1: Widget1Component;
  @ViewChild(Widget2Component) child2: Widget2Component;
  @ViewChild(Widget3Component) child3: Widget3Component;
  @ViewChild(Widget4Component) child4: Widget4Component;


  subs = new Subscription();


  buttonOptions: any;
  cancelOptions: any;
  newWidgetButtonOptions: any;
  popupVisible = false;
  widgetOptions = {};
  widgets: any;
  widget: any;
  new_widget: any;
  popupConfigVisible = false;
  popupInfoVisible = false;
  selectedWidget: any;
  filter: any;
  selectedWidget_id: any;

  companiesOptions: any;

  divisionOptions: any;
  cdaOptions: any;

  zoneOptions: any;
  cdOptions: any;

  cancelPopVisible: any;
  deletedItem: any;


  monthOptions: any;
  yearOptions: any;
  this_month;
  this_year;

  constructor(private widgetService: WidgetService, private toastrService: ToastrService
    , private dragulaService: DragulaService
  ) {
    this.new_widget = {};
    this.widget = {};

    this.filter = {};
    this.widgets = [];
    this.cdaOptions = {};
    this.zoneOptions = {};
    this.cdOptions = {};
    this.cancelPopVisible = false;
    this.subs.add(dragulaService.drop('DRAGULA_FACTS')
      .subscribe(({ el, target, source, sibling }) => {


        let align;
        if (target.id == 'right') {
          align = 'left';
        } else if (target.id == 'left') {
          align = 'right';
        }

        this.widgetService.changePositionWidget({ id: el.id, position: this.getElementIndex(el), align: align }).subscribe((data: any) => {

        }, err => {

        });



      })
    );





    this.widgetService.getCdList().subscribe(
      (res: any) => {
        this.cdOptions = {
          displayExpr: 'name',
          valueExpr: 'id',
          items: res,
          searchEnabled: true,
          onSelectionChanged: (e3) => {
            console.log(e3);
          }
        };
      }
    );



    const d = new Date();
    this.this_month = d.getMonth() + 1;

    this.this_year = d.getFullYear();



    this.monthOptions = {
      displayExpr: 'name',
      valueExpr: 'id',
      items: [
        { id: 1, name: 'Janvier' }, { id: 2, name: 'Février' }, { id: 3, name: 'Mars' }, { id: 4, name: 'Avril' }, { id: 5, name: 'Mai' }, { id: 6, name: 'Juin' }, { id: 7, name: 'Juillet' },
        { id: 8, name: 'Août' }, { id: 9, name: 'Septembre' }, { id: 10, name: 'Octobre' }, { id: 11, name: 'Novembre' }, { id: 12, name: 'Décembre' }],
      searchEnabled: true,
      onSelectionChanged: (e3) => {
        console.log(e3);
      }
    };


    this.yearOptions = {
      displayExpr: 'name',
      valueExpr: 'id',
      items: [
        { id: 2017, name: '2017' }, { id: 2018, name: '2018' }, { id: 2019, name: '2019' }, { id: 2020, name: '2020' }, { id: 2021, name: '2021' }, { id: 2022, name: '2022' }, { id: 2023, name: '2023' },
        { id: 2024, name: '2024' }, { id: 2025, name: '2025' }, { id: 2026, name: '2026' }, { id: 2027, name: '2027' }, { id: 2028, name: '2028' }, { id: 2029, name: '2029' }, { id: 2030, name: '2030' }],
      searchEnabled: true,
      onSelectionChanged: (e3) => {
        console.log(e3);
      }
    };




  }



  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el);
  }




  showWidgetPopup() {
    this.popupVisible = true;
  }

  addWidget(event) {

    // this.widgets.push({title : this.widget.title , type : this.widget.type})
  }

  doSomething2(event) {

  }



  ngOnInit() {

    this.widgetService.getAll(1).subscribe((data: any) => {


      data.forEach((it) => {

        if (it.params.nbr1 == null) {
          it.params.nbr1 = 0;
        }
        if (it.params.nbr2 == null) {
          it.params.nbr2 = 0;
        }

        this.widgets.push({ id: it.id, title: it.title, params: it.params, type: it.type, align: it.align, filter: it.filter, sub_title: it.sub_title, updated_at: it.updated_at })
      });


      this.widgets.sort(function(a, b) {
        let posA = a.possition;
        let posB = b.possition;


        if (posA < posB) return -1;
        if (posA > posB) return 1;

        let dateA = new Date(a.updated_at);
        let dateB = new Date(b.updated_at);


        if (posA = posB && dateA < dateB) { return -1; }
        if (posA = posB && dateA > dateB) { return 1; }

        return 0;
      });




      this.widgets.sort(function(a, b) {
        let posA = a.possition;
        let posB = b.possition;

        let dateA = new Date(a.updated_at);
        let dateB = new Date(b.updated_at);


        if (posA == posB && dateA > dateB) { return -1; }
        if (posA == posB && dateA < dateB) { return 1; }

        return 0;
      });



    }, err => {

    });

    this.selectedWidget = {};
    this.widgetService.getList().subscribe((data: any) => {

      this.widgetOptions = {
        displayExpr: 'name',
        valueExpr: 'id',
        items: data,
        searchEnabled: true,
        onSelectionChanged: (e) => {
          this.selectedWidget = e.selectedItem;
          this.new_widget.title = e.selectedItem.name;
          this.new_widget.type = e.selectedItem.id;

        }

      };


    }, err => {

    });



    this.widgetService.getCompaniesList().subscribe((data: any) => {

      this.companiesOptions = {
        displayExpr: 'name',
        valueExpr: 'id',
        items: data,
        searchEnabled: true,
        onSelectionChanged: (e) => {

          this.divisionOptions = {};
          this.cdaOptions = {};
          this.zoneOptions = {};

          this.widgetService.getDivisionList(e.selectedItem.id).subscribe(
            (res: any) => {
              this.divisionOptions = {
                displayExpr: 'name',
                valueExpr: 'id',
                items: res,
                searchEnabled: true,
                onSelectionChanged: (e1) => {

                  this.cdaOptions = {};
                  this.zoneOptions = {};
                  this.widgetService.getCdasList(e1.selectedItem.id).subscribe(
                    (_res: any) => {
                      this.cdaOptions = {
                        displayExpr: 'name',
                        valueExpr: 'id',
                        items: _res,
                        searchEnabled: true,
                        onSelectionChanged: (e2) => {


                          this.zoneOptions = {};
                          this.widgetService.getZonesList(e2.selectedItem.id).subscribe(
                            (res2: any) => {
                              this.zoneOptions = {
                                displayExpr: 'name',
                                valueExpr: 'id',
                                items: res2,
                                searchEnabled: true,
                                onSelectionChanged: (e3) => {

                                }
                              };
                            }
                          );

                        }
                      };
                    }
                  );

                }
              };
            }
          );
        }
      };
    }, err => {

    });



    this.buttonOptions = {
      text: 'ENREGISTER',
      type: 'success',
      useSubmitBehavior: true,
      onClick: (e) => {


        this.widgetService.changeWidgetFilter(this.filter, this.selectedWidget_id).subscribe((data: any) => {

          // this.toastrService.success(data.message);



          this.widgets.forEach(it => {
            if (this.widget === it) {

              it.params = data.params;
              it.filter = data.filter;



            }
          });

          this.toastrService.success('Widget a été modifié avec succès');


          this.widget = {};
          this.popupConfigVisible = false;

        }, err => {

        });


      }
    };


    this.cancelOptions = {
      text: 'Annuler',
      type: 'default',
      useSubmitBehavior: true,
      onClick: (e) => {
        this.popupConfigVisible = false;
      }
    };


    this.newWidgetButtonOptions = {
      text: 'ENREGISTER',
      type: 'success',
      useSubmitBehavior: true,
      onClick: (e) => {

        this.widgetService.createWidget(this.new_widget).subscribe((data: any) => {


          this.widgets.unshift({ id: data.id, title: data.title, params: data.params, type: data.type, align: data.align, filter: data.filter, sub_title: data.sub_title, updated_at: data.updated_at });


          this.popupVisible = false;
          this.new_widget = {};


        });

      }
    };




  }









  _filter: any;
  filter_title: any;
  info(item) {
    this.selectedWidget_id = item.id;

    this._filter = item.filter;
    this.filter_title = item.title;


    this.popupInfoVisible = true;

  }



  config(item) {
    this.selectedWidget_id = item.id;

    this.filter = {};
    this.widget = item;

    /* 
     let filter:any = JSON.parse(item.filter);
     
     console.log(filter);
 
     if(filter.ste ){
 
 
           this.widgetService.getDivisionList(filter.ste).subscribe(
             (res: any) => {
               this.divisionOptions.items =  res;
               
             });
                 
     } 
     if(filter.structure){
 
       console.log('cdaas')
       this.widgetService.getCdasList(filter.structure).subscribe(
         (res: any) => {
           console.log('cdaas1')
 
           this.cdaOptions = {
             displayExpr: 'name',
             valueExpr: 'id',
             items:  res,
             searchEnabled: true,
             onSelectionChanged: (e2) => {
                             
                           
               this.zoneOptions = {};
               this.widgetService.getZonesList(e2.selectedItem.id).subscribe(
                 (res2: any) => {
                   this.zoneOptions = {
                     displayExpr: 'name',
                     valueExpr: 'id',
                     items:  res2,
                     searchEnabled: true,
                     onSelectionChanged: (e3) => {
                        console.log(e3);
                     }
                   };
                 }
               );
 
              }
           };
 
      
       
         });
     } 
     if(filter.cda){
 
       this.widgetService.getZonesList(filter.cda).subscribe(
         (res: any) => {
           
           this.zoneOptions = {
             displayExpr: 'name',
             valueExpr: 'id',
             items:  res,
             searchEnabled: true
           };
   
         });
 
     }
 
     
      this.filter = filter;*/
    this.popupConfigVisible = true;

  }






  close(item) {
    this.cancelPopVisible = true;
    this.deletedItem = item;
  }


  delete() {

    this.widgetService.deleteWidget(this.deletedItem.id).subscribe((data: any) => {
      const index = this.widgets.indexOf(this.deletedItem);
      this.widgets.splice(index, 1);
      this.toastrService.success(data.message);
      this.cancelPopVisible = false;

    });


  }


  cancelPopup() {
    this.cancelPopVisible = false;
  }



}





