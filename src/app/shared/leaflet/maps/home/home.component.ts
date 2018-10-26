import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { GeoJSON, latLng, Layer, LeafletEvent, Map, polygon, tileLayer } from 'leaflet';
import { ZonesService } from '../../../../modules/contracts/services/zones.service';
import { CarteService } from '../../../../modules/cartographie/carte.service';
import '../../../../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';

declare module 'leaflet' {
  namespace control {
    function fullscreen(v: any);
  }
}

@Component({
  selector: 'app-home-leaflet',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class LeafLetHomeComponent implements OnInit {

  cdas: any = {};
  carte: Map;
  layer: Layer;
  loadingVisible = true;
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
      'HERE hybridDay': tileLayer('https://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/' +
        '{mapID}/hybrid.day/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}', {
          attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
          subdomains: '1234',
          mapID: 'newest',
          app_id: 'LFDFxuH7piXnFpMEhCfS',
          app_code: 'wgD39fkWKD3SNkEBLx_0LQ',
          base: 'aerial',
          maxZoom: 20,
          type: 'maptile',
          language: 'eng',
          format: 'png8',
          size: '256',
          keepBuffer: 10
        }),
      'Esri': tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 18,
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX,' +
            ' GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })
    },
    overlays: {
      'Big Square':
        polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]]),
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
    color: '#1a5a10',
    fillColor: '#33a114',
    fillOpacity: 1
  };

  style_incident = {
    color: '#68090a',
    fillColor: '#ca1214',
    fillOpacity: 1
  };
  ilot_info: any;
  show_parcel_info = false;
  showCdas = true;

  constructor(private zonesService: ZonesService,
    private ilotService: CarteService,
    private router: Router) {
    this.layer = new Layer();
  }

  ngOnInit() {
    this.zonesService.getCDAs().subscribe((res: any) => {
      this.cdas = res.data;
    });

  }

  onMapReady = (map: Map) => {
    this.carte = map;
    // --------------------------------------------------------------------------------------------------------------- //
    L.control.fullscreen({
      position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
      title: 'Plein écran', // change the title of the button, default Full Screen
      titleCancel: 'Quitter le mode plein écran', // change the title of the button when fullscreen is on, default Exit Full Screen
      content: null, // change the content of the button, can be HTML, default null
      forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
      forcePseudoFullscreen: false, // force use of pseudo full screen even if full screen API is available, default false
      fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
    }).addTo(map);
    map.on('enterFullscreen', () => map.invalidateSize());
    map.on('exitFullscreen', () => map.invalidateSize());
    // --------------------------------------------------------------------------------------------------------------- //
    map.addEventListener('move', (e) => {
      this.show_parcel_info = false;
    });
    // --------------------------------------------------------------------------------------------------------------- //
    // --------------------------------------------------------------------------------------------------------------- //
    this.ilotService.getIlotByZone(null).subscribe(
      (res: any) => {
        res.data = res.data.map(il => {
          il.da = JSON.parse(il.da);
          il.da.geometry = JSON.parse(il.da.geometry);
          return il.da;
        });
        console.log(res.data);
        const polygons = new GeoJSON(res.data, {
          style: (geom) => {
            if (geom.properties.has_incident) {
              return this.style_incident;
            }
            return this.style;
          }
        }).on('click', (ev: LeafletEvent) => {
          const e: any = ev;
          const layer = e.layer.feature.properties;
          this.ilot_info = {
            name: layer.p_name,
            contracted_surface: layer.contracted_surface[0].surface,
            id: layer.id,
            cda: layer.cda_name,
            parcel_surface: layer.parcel_surface,
            ilot_surface: layer.ilot_surface,
            zone: layer.zone_name,
            ag_name: layer.ag_name,
            ag_tel: layer.ag_tel,
            prestataire: layer.prestataire,
            semoir: layer.semoir,
            date_semis: layer.date_semis,
            advisors: layer.advisors,

          };
          this.show_parcel_info = true;
        });

        map.addLayer(polygons);
        this.loadingVisible = false;
        /*res.data.forEach(ilot => {
          const geom = JSON.parse(ilot.da);
          console.log(geom);
          console.log(this.map);
          const polygon = new Polygon(geom.coordinates, {color: '#06A214'});
          map.addLayer(polygon);
        });*/
      }
    );
    // --------------------------------------------------------------------------------------------------------------- //
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

  show = (name: string) => {
    this.router.navigate(['/']);
    /*this.showCdas = name === 'cdas';*/
  }
}
