import {NgModule, Component, enableProdMode, ViewChild} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaService } from 'ng2-dragula';
import { WidgetService } from './services/widget-service.service';
import { Helper } from '../../../../shared/classes/helper';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {Widget2Component} from './widget/widget2.component';
import {Widget1Component} from './widget/widget1.component';
import {Widget3Component} from './widget/widget3.component';
import {Widget4Component} from './widget/widget4.component';


@Component({
  selector: 'app-dash-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],

})
export class IndexDashComponent   {

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


  constructor(private widgetService : WidgetService , private toastrService: ToastrService
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
      console.log(target.id);
      console.log( this.getElementIndex(el));
      console.log(el.id);

      let align;
      if (target.id == 'right') {
        align = 'left';
      } else if (target.id == 'left' ) {
        align = 'right';
      }

      this.widgetService.changePositionWidget({id : el.id, position : this.getElementIndex(el) , align : align}).subscribe((data: any) => {

      }, err => {

      }); 

      /*
      console.log('dropModel:');
      console.log(el);
      console.log(source);
      console.log(target);
      console.log(sourceModel);
      console.log(targetModel);
*/
      

    })
  );





    this.widgetService.getCdList().subscribe(
      (res: any) => {
        this.cdOptions = {
          displayExpr: 'name',
          valueExpr: 'id',
          items:  res,
          searchEnabled: true,
          onSelectionChanged: (e3) => {
            console.log(e3);
          }
        };
      }
    );




  }

 

private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el);
}

 

  ngAfterViewInit() {
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

      console.log(data);

      data.forEach((it) => {


        this.widgets.push({ id: it.id , title: it.title, params: it.params , type: it.type, align: it.align , filter: it.filter , sub_title : it.sub_title , updated_at : it.updated_at })
      });

       
       this.widgets.sort(function(a, b) {
        let posA = a.possition;
        let posB =  b.possition;
  
  
        if (posA < posB) return -1;
        if (posA > posB) return 1;
   
        let dateA = new Date(a.updated_at);
        let dateB = new Date(b.updated_at);
        

        if (posA = posB && dateA <  dateB) { console.log('dt1'); return -1; }
        if (posA = posB && dateA >  dateB ) { console.log('dt2'); return 1; }
        
        return 0;
      });




      this.widgets.sort(function(a, b) {
        let posA = a.possition;
        let posB =  b.possition;
   
        let dateA = new Date(a.updated_at);
        let dateB = new Date(b.updated_at);


        if (posA == posB && dateA > dateB ) {  return -1; }
        if (posA == posB && dateA < dateB ) {  return 1; }
        
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
           console.log('tt3');
           console.log(e.selectedItem);
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
                items:  res,
                searchEnabled: true,
                onSelectionChanged: (e1) => {
                   console.log(e);

                   this.cdaOptions = {};
                   this.zoneOptions = {};
                   this.widgetService.getCdasList(e1.selectedItem.id).subscribe(
                     (_res: any) => {
                       this.cdaOptions = {
                         displayExpr: 'name',
                         valueExpr: 'id',
                         items:  _res,
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
        console.log(this.filter);
       // console.log(this.widget);
  
       this.widgetService.changeWidgetFilter(this.filter, this.selectedWidget_id).subscribe((data: any) => {

       // this.toastrService.success(data.message);



         this.widgets.forEach(it => {
           if ( this.widget === it) {

            it.params = data.params;
            it.filter = data.filter;

            if (it.type === 1) {
              this.child1.count(data.params.nbr1);
            } else if (it.type === 2) {
             // this.child2.count(data.params.nbr1);
            } else if (it.type === 3) {
              this.child3.count(data.params.nbr1);
            } else if (it.type === 4) {
                this.child4.count(data.params.nbr1);
              }

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


    this.newWidgetButtonOptions  = {
      text: 'ENREGISTER',
      type: 'success',
      useSubmitBehavior: true,
      onClick: (e) => {
        
        this.widgetService.createWidget(this.new_widget).subscribe((data: any) => {

       
        this.widgets.unshift({ id : data.id , title: data.title, params: data.params, type: data.type, align: data.align , filter: data.filter, updated_at: data.updated_at });


           this.popupVisible = false;
           this.new_widget = {};


        });
        
      }
    };


    

    };

  

 
 

 


  _filter: any;
  filter_title: any;
  info(item) {
    this.selectedWidget_id = item.id;

    this._filter = item.filter;
    this.filter_title = item.title;
    console.log(item);
   // this._filter.title = item.title;
    console.log(this._filter);
    this.popupInfoVisible = true;

  }



  config(item) {
    this.selectedWidget_id = item.id;

    console.log(this.selectedWidget_id);
    this.filter = {};
    this.widget  = item;

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





