import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Helper} from '../../../../shared/classes/helper';
import CustomStore from 'devextreme/data/custom_store';
import {ArrachageService} from '../../services/arrachage.service';
import {isNull} from 'util';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-convoation-list',
  templateUrl: './convoation-list.component.html',
  styleUrls: ['./convoation-list.component.scss']
})
export class ConvoationListComponent implements OnInit {

  convocations: any = {};
  rotation: any = {};
  submitButtonOptions: any = {};
  currentConvocation: any = {};
  TypeCamionEditorOptions: any = {};
  camionTypes: any = {};
  helper: any;
  today: Date;
  tomorrow: Date;
  popupVisible = false;


  constructor(private arrachageService: ArrachageService,
              private toaster: ToastrService) {
    this.helper = Helper;
    this.today = new Date();
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.today.getDate() + 1);
    this.submitButtonOptions = {
      text: 'Valider et envoyer',
      type: 'success',
      icon: 'check',
      useSubmitBehavior: true,
      onClick: ($ev) => {
        this.arrachageService.genrateRotations({
          idConvocation: this.currentConvocation.data.ir_id,
          nbr_camions: this.rotation.nbr_camion,
          type_camion_id: this.rotation.type_camion
        }).subscribe((res) => {
          this.popupVisible = false;
          console.log(this.currentConvocation.btn);
          this.currentConvocation.btn.disabled = true;
        }, error1 => {

        });
      }
    };
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
    this.arrachageService.getCamionTypes().subscribe(
      (camions: any) => {
        this.camionTypes = camions;
        this.TypeCamionEditorOptions = {
          label: 'Type de camions',
          items: this.camionTypes,
          displayExpr: 'ridelle_code',
          valueExpr: 'id',
          searchEnabled: true,
        };
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

  downloadDocument(idMotif: number) {
    this.arrachageService.downloadMotif(idMotif).subscribe(
      (res: any) => {
        window.open(res.data.file);
      }, error1 => {
        console.log(error1);
      }
    );
  }


  generate(ev: any, data: any, btn: any): void {
    this.popupVisible = true;
    this.currentConvocation = {
      data: data.data,
      btn: btn
    };
  }


  getDatedifference = (dateValue: string) => {
    const date = new Date(dateValue);
    return date.getDate() === this.tomorrow.getDate();

  };

  clearDataOnShow = () => {
  };
}
