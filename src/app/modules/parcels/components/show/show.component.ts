import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../../shared/classes/helper';
import { ActivatedRoute } from '@angular/router';
import { ParcelsService } from '../../services/parcels.service';
import { PreconisationsIntrantsService } from '../../../preconisations-intrants/service/preconisations-intrants.service';
import CustomStore from 'devextreme/data/custom_store';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  helper: any;
  parcel:any;
  preconisations_intrants:any;
  avances:any;
  incidents:any;

  preconisations_intrants_count:any = 0;
  avances_count:any =0;
  incidents_count:any =0;

  constructor(private route:ActivatedRoute , private parcelsService : ParcelsService,
    private preconisationsIntrantsService: PreconisationsIntrantsService
    ) {
    this.helper = Helper;
   }

  ngOnInit() {

    this.route.params.subscribe(
      params => {

        this.parcelsService.getParcel(params.id).subscribe((response) => {
          this.parcel = response.data;

          console.log(this.parcel);

        }, error1 => {
          throw error1;
        });
     

      this.preconisations_intrants = {};
     
      this.preconisations_intrants.store = new CustomStore({
        load: (loadOptions: any) => {
          loadOptions.filter = ['p_id', '=', params.id];
          return this.preconisationsIntrantsService.getListeDemandesDx(loadOptions)
            .toPromise()
            .then(response => {

              this.preconisations_intrants_count = response.data.length;
              return response;
            })
            .catch(error => {
              throw error;
            });
        }
      });

      this.avances = {};

this.avances.store = new CustomStore({
  load: (loadOptions: any) => {
    loadOptions.filter = ['p_id', '=', params.id];
    return this.preconisationsIntrantsService.getListeAvancesDx(loadOptions)
      .toPromise()
      .then(response => {


        const res = {};
         response.data.forEach( rs => {
         rs.state = this.helper.getStatusValue(rs.state);
         rs.rib =  rs.rib ? `${rs.bank_code}${rs.rib}${rs.bank_rib_key}` : '' ;
       });

       console.log(response);

       let obj = response.data.filter(item => item.p_id == params.id );

       this.avances_count = response.data.filter(item => item.p_id == params.id ).length;

       console.log(obj);
       
        return obj;
      })
      .catch(error => {
        throw error;
      });
  }
});

});

  }


  ngAfterViewInit(){


$(function() {
  generateGoogleMapImg('.googleMapImg');
});


/**
 * The Google Maps Image Generator Function
 *
 * @param The element ID or Class.
 * @return Image HTML element.
 */
function generateGoogleMapImg(e) {
  $(e).each(function(){
    
    /** Lets create some settings */
    var address = $(this).data('address');
    var marker = $(this).data('marker');
    var markerSize = $(this).data('marker-size') ? $(this).data('marker-size') : 'normal';
    var markerColor = $(this).data('marker-color') ? $(this).data('marker-color') : 'purple';
    var mapWidth = $(this).data('width') ? $(this).data('width') : 390;
    var mapHeight = $(this).data('height') ? $(this).data('height') : 250;
    var mapZoom = $(this).data('zoom') ? $(this).data('zoom') : 12;
    var mapType = $(this).data('type') ? $(this).data('type') : 'terrain';
    
    /** If the address is set, generate the map image */
    if(address) {
      
      /** Create the map URL */
      var url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + address + '&zoom=' + mapZoom + '&size=' + mapWidth + 'x' + mapHeight + '&maptype=' + mapType;
      
      /** Check for the marker */
      if(marker){
        url += '&markers=size:' + markerSize + '%7Ccolor:' + markerColor + '%7C' + address;
      }
      
      /** Create the map image */
      $(this).html('<img src="' + url + '">');
      
    /** If the address is empty remove the map wrapper */
    } else {
      $(this).css("display", "none");
    }
  });
}
  }

}
