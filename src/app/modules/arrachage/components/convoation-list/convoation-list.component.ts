import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Helper} from '../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import { ArrachageService } from '../../services/arrachage.service';
import { isNull } from 'util';

@Component({
  selector: 'app-convoation-list',
  templateUrl: './convoation-list.component.html',
  styleUrls: ['./convoation-list.component.scss']
})
export class ConvoationListComponent implements OnInit {

  convocations: any = {};
  helper: any;


  popupcodebarreVisible = false;
  _code = null;
  @ViewChild('codebarre') codebarre: ElementRef;
  @ViewChild('focusout') focusout: ElementRef;
  @ViewChild('popup') popup: ElementRef;



  constructor(private arrachageService: ArrachageService,
    private toaster: ToastrService) {
    this.helper = Helper;
  }

  ngOnInit() {
    this.convocations.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.arrachageService.getConvocationsDx(loadOptions)
          .toPromise()
          .then(response => {
            return response;
          })
          .catch(error => {
            throw error;
          });
      }
    });
  }

  getStatusColor(value: string): string {
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'done'.toLowerCase() || value.toLowerCase() === 'validé'.toLowerCase()) {
      return 'm-badge m-badge--warning m-badge--wide';
    } else if (value.toLowerCase() === 'inprogress'.toLowerCase() || value.toLowerCase() === 'convoqué'.toLowerCase()) {
      return 'm-badge m-badge--success m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }

  downloadDocument(idConvocation: number) {
    this.arrachageService.printConvocation(idConvocation);
  }




  Scan() {
    this.popupcodebarreVisible = true;
  }


  SearchBycodebarre() {


    this.popup.nativeElement.addEventListener('click', () => {
      this.codebarre.nativeElement.focus();
    });

    this.codebarre.nativeElement.focus();

    this.codebarre.nativeElement.addEventListener('input', () => {

      setTimeout(() => {

        console.log('codebarre');

        this._code = this.codebarre.nativeElement.value;
        this.codebarre.nativeElement.value = '';
        this.focusout.nativeElement.focus();


        if (this._code != '') {

          this._code = this._code.replace(/à/g, "0");
          this._code = this._code.replace(/&/g, "1");
          this._code = this._code.replace(/é/g, "2");
          this._code = this._code.replace('"', "3");
          this._code = this._code.replace("'", "4");
          this._code = this._code.replace("(", "5");
          this._code = this._code.replace("-", "6");
          this._code = this._code.replace(/è/g, "7");
          this._code = this._code.replace("_", "8");
          this._code = this._code.replace(/ç/g, "9");

          this.convocations = {};
          console.log('tt');
          let code = this._code;
          this.convocations.store = new CustomStore({
            load: (loadOptions: any) => {
              loadOptions.codebarre = code;
              loadOptions.filter = ['code_barre', '=', code];
              return this.arrachageService.getConvocationsDx(loadOptions)
                .toPromise()
                .then(response => {
                  console.log(response);
                  return response;
                })
                .catch(error => {
                  throw error;
                });
            }
          });



        }


        this.popupcodebarreVisible = false;

      }, 1000);


    });


  }


}
