import {Component, OnInit} from '@angular/core';
import {ArrachageService} from '../../services/arrachage.service';
import {ToastrService} from 'ngx-toastr';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import {Helper} from '../../../../shared/classes/helper';
import {isNull} from 'util';

@Component({
  selector: 'app-rotations-list',
  templateUrl: './rotations-list.component.html',
  styleUrls: ['./rotations-list.component.scss']
})
export class RotationsListComponent implements OnInit {

  parcels: any = {};
  selectedConvocation: any = {};
  submitButtonOptions: any = {};
  assignButtonOptions: any = {};
  dataSource: any = {};
  ridelle: any = {};
  popupVisible = false;
  assignPopUpVisible = false;
  helper: Helper;
  returnedCamion: any = {};
  returnedRotation: any = {};
  validateAssignmentGrid = false;


  constructor(private arrachageService: ArrachageService,
              private toaster: ToastrService) {
    this.helper = Helper;
    this.submitButtonOptions = {
      text: 'Consulter',
      type: 'default',
      icon: 'check',
      useSubmitBehavior: true,
      onClick: ($ev) => {
        this.arrachageService.proposeAssignment(this.ridelle.code).subscribe((res) => {
          if (res.data.camion) {
            this.returnedCamion = res.data.camion;
            this.returnedRotation = res.data.rotation;
            this.dataSource = [{returnedCamion: this.returnedCamion, returnedRotation: this.returnedRotation}];
            this.validateAssignmentGrid = true;
          }
        }, err => {
          this.toaster.warning(err.error.message, err.error.data, {
            positionClass: 'toast-top-center'
          });
        });
      }
    };
  }

  ngOnInit() {
    this.parcels.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.arrachageService.getGeneratedParcels(loadOptions)
          .toPromise()
          .then(response => {
            return response;
          })
          .catch(error => {
            throw error;
          });
      }, update: (loadOptions: any) => {
        console.log(loadOptions);
        return Promise.resolve(true);
      }
    });
  }

  showRotations(data: any) {
    return this.arrachageService.getRotations(data)
      .subscribe((res: any) => {
        this.popupVisible = true;
        this.selectedConvocation = res.data;
      }, error => {
        console.log(error);
      });
  }

  getStatusColor(value: string): string {
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'done'.toLowerCase() || value.toLowerCase() === 'validé'.toLowerCase()) {
      return 'm-badge m-badge--success m-badge--wide';
    } else if (value.toLowerCase() === 'inprogress'.toLowerCase() || value.toLowerCase() === 'En cours'.toLowerCase()) {
      return 'm-badge m-badge--primary m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }

  getStatut = (value: string): string => {
    if (value === 'inprogress') {
      return 'ENCOURS';
    } else if (value === 'done') {
      return 'VALIDÉ';
    } else if (value === 'canceled') {
      return 'ANNULÉ';
    }
    return '';
  };

  cancel = (data, btn) => {
    this.arrachageService.cancelRotation(data.data.id)
      .subscribe(
        (res: any) => {
          btn.disabled = true;
          this.toaster.success(`La rotation  ${res.data.id} a été annulée avec succès `, 'Success', {
            positionClass: 'toast-top-center'
          });
        }, err => {
          this.toaster.warning(err.error.message, err.error.data, {
            positionClass: 'toast-top-center'
          });
        }
      );
  };


  assignByRC() {
    this.assignPopUpVisible = true;
  }

  validateAssignment() {
    this.arrachageService.proposeAssignment(this.returnedCamion.ridelle_code, true).subscribe((res) => {
      this.toaster.success(`La parcelle  ${res.rotation.p_name} a été affectée avec succès `, 'Success', {
        positionClass: 'toast-top-center'
      });
      this.assignPopUpVisible = false;
    }, err => {
      this.toaster.warning(err.error.message, err.error.data, {
        positionClass: 'toast-top-center'
      });
    });
  }

  clearAssignmentData() {
    this.returnedCamion = null;
    this.returnedRotation = null;
  }
}
