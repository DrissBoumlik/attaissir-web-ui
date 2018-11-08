import { Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { Helper } from '../../../../shared/classes/helper';
import { isNull } from 'util';
import { MouvementsService } from '../../service/mouvements.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  mouvements: any = {};
  helper: any;


  constructor(private mouvementsService: MouvementsService) {
    this.helper = Helper;
  }


  ngOnInit() {
    this.mouvements.store = new CustomStore({
      load: (loadOptions: any) => {
        return this.mouvementsService.getListeMouvementDetailsDx(loadOptions)
          .toPromise()
          .then(response => {
            console.log(response);
            const res = [];
            response.data.map(
              (mv: any) => {
                mv.so_type = this.orderType(mv.so_type, mv.tsd_full_name);
                mv.emetteur = {
                  id: mv.ss_id ? mv.ss_id : mv.tsd_id,
                  name: mv.ss_name ? mv.ss_name : mv.tsd_full_name,
                  address: mv.ss_address ? mv.ss_address : mv.tsd_address,
                  tel: mv.ss_tel ? mv.ss_tel : mv.tsd_tel1,
                  email: mv.ss_email ? mv.ss_email : mv.tsd_email,
                  rc: mv.tsd_rc ? mv.tsd_rc : '',
                  patent_number: mv.tsd_patent_number ? mv.tsd_patent_number : '',
                  i_f: mv.tsd_if ? mv.tsd_if : '',
                  ice: mv.tsd_ice ? mv.tsd_ice : '',
                  tva_code: mv.tsd_tva_code ? mv.tsd_tva_code : '',
                };
                mv.recepteur = {
                  id: mv.sd_id ? mv.sd_id : mv.sd_id,
                  name: mv.sd_name ? mv.sd_name : mv.sd_name,
                  address: mv.sd_address ? mv.sd_address : mv.sd_address,
                  tel: mv.sd_tel ? mv.sd_tel : mv.sd_tel,
                  email: mv.sd_email ? mv.sd_email : mv.sd_email
                };
                return mv;
              }
            );
            /*console.log(response);
            response.data.forEach((it) => {
              if (it.to_warehouse_name != null) {
                it.recepteur = it.to_warehouse_name;
              } else if (it.to_third_name != null) {
                it.recepteur = it.to_third_name;
              }

              if (it.from_third_name != null) {
                it.emetter = it.from_third_name;
              } else if (it.from_warehouse_name != null) {
                it.emetter = it.from_warehouse_name;
              }
            });
*/
            const json = response;
            return json;
          })
          .catch(error => {
            throw error;
          });
      }
    });


    Helper.permissionMethod(['none'])
    {
      console.log('ok');

    }
  }


  getStatusColor(value: string): string {
    if (isNull(value)) {
      return 'm-badge m-badge--primary m-badge--wide';
    }
    if (value.toLowerCase() === 'done') {
      return 'm-badge m-badge--success m-badge--wide';
    } else if (value.toLowerCase() === 'inprogress') {
      return 'm-badge m-badge--info m-badge--wide';
    } else if (value.toLowerCase() === 'canceled') {
      return 'm-badge m-badge--danger m-badge--wide';
    } else {
      return 'm-badge m-badge--primary m-badge--wide';
    }
  }

    orderType = (type: string, tp: string): string => {
    if (type === 'transfer') {
      return 'transfert';
    } else if (type === 'delivery') {
      return 'LIVRAISON';
    } else if (type === 'return') {
      console.log('type', type);
      console.log('tp', tp);
      return tp ? 'Retour Agriculteur' : 'Retour Fournisseur';
    } else if (type === 'receive') {
      return 'Réception des intrants';
    }
    return type;
  }

  gotoShow(event) {

  }

}
