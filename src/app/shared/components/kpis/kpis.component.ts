import { Component, OnInit, ViewChild } from '@angular/core';
import { FamilyService } from '../../services/family-service.service';
import { DxVectorMapComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';

@Component({
  selector: 'app-kpis',
  templateUrl: './kpis.component.html',
  styleUrls: ['./kpis.component.scss']
})
export class KpisComponent implements OnInit {

  infiniteList: DataSource;

  center: any;

  @ViewChild('map') map: DxVectorMapComponent;

  constructor(private familyService: FamilyService) {
    this.customizeLayers = this.customizeLayers.bind(this);
    this.infiniteList = new DataSource({
      load: (loadOptions) => {
        return this.familyService.getKpiData().toPromise()
          .then(
            response => {
              console.log(response);
              const json = response.data[0].cdas;
              this.center = json.features[0].geometry.coordinates[0][0];
              return json;
            }
          )
          .catch(error => {
            throw error;
          });
      }
    });
  }


  customizeTooltip = (arg) => {
    /*if (arg.attribute('name')) {
      return {
        text: arg.attribute('name') + ': ' + arg.attribute('name') + '% of world population'
      };
    }*/

    // console.log(this.map.instance.getLayers()[0].getDataSource().filter());
    const node1 = '<div class="box">\n' +
      '  <div class="box__header">\n' +
      '    <h3 class="box__header-title">CDA: ' + arg.attribute('name') + '</h3>\n' +
      '  </div>\n' +
      '  <div class="box__body">\n' +
      '    <div class="stats stats--main">\n' +
      '      <div class="stats__amount">'
      + (arg.attribute('kpis')[0].sup_contracted ? arg.attribute('kpis')[0].sup_contracted : 0)
      + '</div>\n' +
      '      <div class="stats__caption"> (Ha) contractée</div>\n' +
      '      <div class="stats__change">\n' +
      '      </div>\n' +
      '    </div>\n' +
      '\n' +
      '    <div class="stats">\n' +
      '      <div class="stats__amount">'
      + (arg.attribute('kpis')[0].sup_programmed ? arg.attribute('kpis')[0].sup_programmed : 0)
      + '</div>\n' +
      '      <div class="stats__caption"> (Ha) programmée</div>\n' +
      '      <div class="stats__change">\n' +
      '      </div>\n' +
      '    </div>\n' +
      '\n' +
      '    <div class="stats">\n' +
      '      <div class="stats__amount">'
      + (arg.attribute('kpis')[0].nb_ag ? arg.attribute('kpis')[0].nb_ag : 0)
      + '</div>\n' +
      '      <div class="stats__caption">agrégés</div>\n' +
      '      <div class="stats__change">\n' +
      '      </div>\n' +
      '    </div>\n' +
      '\n' +
      '  </div>\n' +
      '</div>';

    const node = '<div class="hover-tool-tip">' +
      '<div class="cda_item_head"><h3>CDA: ' + arg.attribute('name') + '</h3></div>' +
      '<div class="cda_item_body"> <ul>' +
      '<li style="text-align: left; padding-bottom: 5px""> '
      + (arg.attribute('kpis')[0].sup_contracted ? arg.attribute('kpis')[0].sup_contracted : 0)
      + ' (Ha) contractée</li>' +
      '<li style="text-align: left; padding-bottom: 5px""> ' + 0 + ' (Ha) programmée</li>' +
      '<li style="text-align: left; padding-bottom: 5px""> ' + arg.attribute('kpis')[0].nb_ag + ' agrégés</li>' +
      '</ul> </div></div>';

    return {
      html: node1
    };
  }

  customizeLayers(elements) {
    elements.forEach((element) => {
      /*      element.color = 'rgba(0,0,0,0';*/
    });
  }


  ngOnInit() {

    /*this.familyService.getKpiData().subscribe(
      (data: any) => {
        data.data.forEach((cda: any) => {
          const obj = {
            type: 'Feature',
            properties: {
              name: 'CDA'
            },
            geometry: {
              'type': 'Polygon',
              'coordinates': [[
                [35.491543, -5.448968],
                [32.679579, -1.643044],
                [22.141241, -14.278483],
                [31.743148, -9.493896]
              ]]
            }
          };
          console.log(obj);
          this.dataSource.features.push(obj);
          this.map.redrawOnResize = true;
          this.map.size = {
            width: 200,
            height: 300
          };
        });
      });*/
  }

}
