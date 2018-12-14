import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ImportService } from '../services/import.service';
import { ToastrService } from 'ngx-toastr';

declare const require: any;
const $ = require('jquery');

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  buttonsave: any;

  import: any = {};

  value: any[] = [];
  typeOptions: any;
  filePath = [];


  constructor(private importService: ImportService,
    private toaster: ToastrService) { }

  ngOnInit() {


    this.typeOptions = {};

    this.buttonsave = {
      text: 'IMPORTER',
      type: 'success',
      icon: 'upload',
      useSubmitBehavior: true,
      onClick: () => {

        // this.test();

      }
    };





    this.typeOptions = {
      label: 'Type',
      displayExpr: 'name',
      valueExpr: 'id',
      searchEnabled: true,
      dataSource: new CustomStore({
        load: (loadOptions: any) => {
          return this.importService.getTypes()
            .toPromise()
            .then(response => {

              const json = response;

              console.log(json);
              return json;
            })
            .catch(error => {
              throw error;
            });
        }

      })
    };

  }



  test(e) {
    console.log(this.import.type);


    const d = new $.Deferred();
    const newDoc = {
      type: this.import.type,
      file: this.filePath[0]
    };


    this.importService.upload(newDoc.file, newDoc.type).subscribe(
      res => {
        d.resolve();
        this.toaster.success('Le document a été téléchargé avec succès.');
      }, error => {
        this.toaster.error('Le document que vous essayez d\'importer est  trop volumineux, ou bien corrompu.');

        //  d.reject('Le document que vous essayez d\'importer est  trop volumineux, ou bien corrompu.');
      });



  }


  /*
    onAddDOC(e: any) {
  
      const d = new $.Deferred();
      const newDoc = {
        type: this.import.type,
        file: this.filePath[0]
      };
      e.cancel = true;
  
  
      this.importService.upload(newDoc.file, newDoc.type).subscribe(
        res => {
          d.resolve();
          e.cancel = true;
          this.toaster.success('Le document a été téléchargé avec succès.');
        }, error => {
          d.reject('Le document que vous essayez d\'importer est  trop volumineux, ou bien corrompu.');
        });
  
  
  
  
      e.cancel = d.promise();
    }
    */


}
