import {Component, OnInit} from '@angular/core';
import {GeoJSON, latLng, Layer, LeafletEvent, Map, polygon, tileLayer} from 'leaflet';
import {ZonesService} from '../../../../modules/contracts/services/zones.service';
import {CarteService} from '../../../../modules/cartographie/carte.service';


@Component({
  selector: 'app-home-leaflet',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class LeafLetHomeComponent implements OnInit {

  cdas: any = {};
  carte: Map;
  layer: Layer;
  options = {
    layers: [
      tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 17,
          className: 'leaflet-top leaflet-left',
          attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS,' +
          ' AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })
    ],
    zoom: 16,
    center: latLng(32.382843, -6.694198)
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Leaflet, openstreetmap.'
      }),

      'Esri': tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS,' +
        ' AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }),
    },
    overlays: {
      'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]]),
    }
  };
  /*layers = [
    polygon([
      [
        32.6207256,
        -8.4743214
      ],
      [32.6198942,
        -8.473506

      ],
      [
        32.6205087,
        -8.472712
      ],
      [
        32.621322,
        -8.4735918
      ],
      [
        32.6207437,
        -8.4743428
      ],
      [
        32.6207256,
        -8.4743214
      ]
    ], {
      color: 'red',
      stroke: true,
      fillColor: 'red',
      fillOpacity: 1
    }),
  ];*/

  style = {
    color: '#136700',
    fillColor: '#136700',
    opacity: 1
  };

  ilot_info: any;
  show_parcel_info = false;

  constructor(private zonesService: ZonesService,
              private ilotService: CarteService) {
    this.layer = new Layer();
  }

  ngOnInit() {
    this.zonesService.getCDAs().subscribe((res: any) => {
      this.cdas = res.data;
    });

  }

  onMapReady = (map: Map) => {
    this.carte = map;
    this.ilotService.getIlotByZone(null).subscribe(
      (res: any) => {
        res.data = res.data.map(il => {
          il.da = JSON.parse(il.da);
          il.da.geometry = JSON.parse(il.da.geometry);
          return il.da;
        });
        console.log(res.data);
        const polygons = new GeoJSON(res.data, {
          style: () => this.style
        }).on('click', (ev: LeafletEvent) => {
          const e: any = ev;
          const layer = e.layer.feature.properties;
          this.ilot_info = {
            name: layer.p_name,
            contracted_surface: layer.p_name,
            id: layer.p_name,
            cda: layer.cda_name,
            zone: layer.zone_name,
            ag_name: layer.ag_name,
            ag_tel: layer.cda_name,
            prestataire: layer.prestataire,
            semoir: layer.semoir,
            date_semis: layer.date_semis,
            advisors: layer.advisors,

          };
          this.show_parcel_info = true;
        });

        map.addLayer(polygons);
        /*res.data.forEach(ilot => {
          const geom = JSON.parse(ilot.da);
          console.log(geom);
          console.log(this.map);
          const polygon = new Polygon(geom.coordinates, {color: '#06A214'});
          map.addLayer(polygon);
        });*/
      }
    );
  }

  onSelectionChanged = (e: any) => {
    this.carte.flyTo(JSON.parse(e.addedItems[0].center));
  }
  /*.bindPopup(function (layer: any) {
      const popup = '<div class="m-portlet__head-caption">' +
        '<div class="m-portlet__head-title">' +
        '<h3 class="m-portlet__head-text"> <strong>Parcelle:</strong> ' + layer.feature.properties.p_name + ' </h3><hr>' +
        '<h3 class="m-portlet__head-text"> <strong>Agrégé:</strong> ' + layer.feature.properties.ag_name + ' </h3><hr>' +
        '<h3 class="m-portlet__head-text"> <strong>Date de semis:</strong> '
        + (layer.feature.properties.date_semis ? layer.feature.properties.date_semis : 'N/A') + ' </h3><hr>' +
        '<h3 class="m-portlet__head-text"> <strong>CDA:</strong> ' + layer.feature.properties.cda_name + ' </h3><hr>' +
        '<h3 class="m-portlet__head-text"> <strong>Zone:</strong> ' + layer.feature.properties.zone_name + ' </h3><hr>' +
        '<h3 class="m-portlet__head-text"> <strong>Conseiller:</strong> ' + layer.feature.properties.advisors + ' </h3>' +
        '</div>' +
        '</div>';
      const test = '<app-kpis></app-kpis>';
      // popup.setContent('Parcelle: ' + '<h2>' + layer.feature.properties.name + '</h2>');
      return popup;
    })*/
}
