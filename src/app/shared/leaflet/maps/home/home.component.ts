import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import {GeoJSON, latLng, Layer, LeafletEvent, Map, Polygon, polygon, tileLayer} from 'leaflet';
import {ZonesService} from '../../../../modules/contracts/services/zones.service';
import {CarteService} from '../../../../modules/cartographie/carte.service';
import '../../../../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';
import {Feature} from 'geojson';

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


  style = {
    color: '#3d5222',
    fillColor: '#33a114',
    fillOpacity: 1
  };

  style_cane = {
    color: '#524b05',
    fillColor: '#a19b4f',
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

  // --------------------------------------------------------------------------------------------------------------- //
  ngOnInit() {
    this.zonesService.getCDAs().subscribe((res: any) => {
      this.cdas = res.data;
    });
  }

  // --------------------------------------------------------------------------------------------------------------- //
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
    map.on('moveend', () => {
/*      map.eachLayer(ly => {
        ly.removeFrom(map);
      });*/
      if (map.getZoom() <= 12) {
        return;
      }
      const center = map.getBounds().getCenter();
      const latlngs = [];
      latlngs.push(map.getBounds().getSouthWest()); // bottom left
      latlngs.push({lat: map.getBounds().getSouth(), lng: center.lng}); // bottom center
      latlngs.push(map.getBounds().getSouthEast()); // bottom right
      latlngs.push({lat: center.lat, lng: map.getBounds().getEast()}); // center right
      latlngs.push(map.getBounds().getNorthEast()); // top right
      latlngs.push({lat: map.getBounds().getNorth(), lng: map.getCenter().lng}); // top center
      latlngs.push(map.getBounds().getNorthWest()); // top left
      latlngs.push({lat: map.getCenter().lat, lng: map.getBounds().getWest()}); // center left
      const ss = polygon(latlngs).toGeoJSON();
      console.log(JSON.stringify(ss.geometry));
      this.ilotService.getIlotByZone({geom: ss.geometry}).subscribe(
        (res: any) => {
          res.data = res.data.map(il => {
            il.da = JSON.parse(il.da);
            il.da.geometry = JSON.parse(il.da.geometry);
            return il.da;
          });
          new GeoJSON(res.data, {
            style: (geom) => {
              if (geom.properties.has_incident) {
                return this.style_incident;
              }
              if (geom.properties.is_cane) {
                return this.style_cane;
              }
              return this.style;
            },
            onEachFeature: (feature: Feature, layer: Layer) => {
              if (map.getZoom() > 15) {
                layer.bindTooltip(feature.properties.p_name, {
                  permanent: true,
                  direction: 'center',
                  className: 'leaflet-tooltip1'
                });
              }
            }
          }).on('click', (ev: LeafletEvent) => {
            const e: any = ev;
            const layer = e.layer.feature.properties;
            this.ilot_info = this.getParcelInfo(layer);
            this.show_parcel_info = true;
          }).addTo(map);


          // this.loadingVisible = false;
          /*res.data.forEach(ilot => {
            const geom = JSON.parse(ilot.da);
            console.log(geom);
            console.log(this.map);
            const polygon = new Polygon(geom.coordinates, {color: '#06A214'});
            map.addLayer(polygon);
          });*/
          /*
          * ,
            onEachFeature: (feature: Feature, layer: Layer) => {
              if (map.getZoom() > 15) {
                layer.bindTooltip(feature.properties.p_name, {
                  permanent: true,
                  direction: 'center',
                  className: 'leaflet-tooltip1'
                });
              }
            }*/
        }
      );
    });
    // --------------------------------------------------------------------------------------------------------------- //
    map.on('zoomend', (ev: LeafletEvent) => {
      if (map.getZoom() < 15) {
        map.eachLayer((layer: Layer) => {
          if (layer.getTooltip()) {
            layer.getTooltip().setOpacity(0);
          }
        });
      } else if (map.getZoom() > 15) {
        map.eachLayer((layer: Layer) => {
          if (layer.getTooltip()) {
            layer.getTooltip().setOpacity(1);
          }
        });
      }
    });
    // --------------------------------------------------------------------------------------------------------------- //
    const center_ = map.getBounds().getCenter();
    const latlngs_ = [];
    latlngs_.push(map.getBounds().getSouthWest()); // bottom left
    latlngs_.push({lat: map.getBounds().getSouth(), lng: center_.lng}); // bottom center_
    latlngs_.push(map.getBounds().getSouthEast()); // bottom right
    latlngs_.push({lat: center_.lat, lng: map.getBounds().getEast()}); // center_ right
    latlngs_.push(map.getBounds().getNorthEast()); // top right
    latlngs_.push({lat: map.getBounds().getNorth(), lng: map.getCenter().lng}); // top center_
    latlngs_.push(map.getBounds().getNorthWest()); // top left
    latlngs_.push({lat: map.getCenter().lat, lng: map.getBounds().getWest()}); // center_ left

    const ss = polygon(latlngs_).toGeoJSON();

    this.ilotService.getIlotByZone({geom: ss.geometry}).subscribe(
      (res: any) => {
        res.data = res.data.map(il => {
          il.da = JSON.parse(il.da);
          il.da.geometry = JSON.parse(il.da.geometry);
          return il.da;
        });
        new GeoJSON(res.data, {
          style: (geom) => {
            if (geom.properties.has_incident) {
              return this.style_incident;
            }
            return this.style;
          },
          onEachFeature: (feature: Feature, layer: Layer) => {
            if (map.getZoom() > 15) {
              layer.bindTooltip(feature.properties.p_name, {
                permanent: true,
                direction: 'center',
                className: 'leaflet-tooltip1'
              });
            }
          }
        }).on('click', (ev: LeafletEvent) => {
          const e: any = ev;
          const layer = e.layer.feature.properties;
          this.ilot_info = this.getParcelInfo(layer);
          this.show_parcel_info = true;
        }).addTo(map);


        // this.loadingVisible = false;
        /*res.data.forEach(ilot => {
          const geom = JSON.parse(ilot.da);
          console.log(geom);
          console.log(this.map);
          const polygon = new Polygon(geom.coordinates, {color: '#06A214'});
          map.addLayer(polygon);
        });*/
        /*
        * ,
          onEachFeature: (feature: Feature, layer: Layer) => {
            if (map.getZoom() > 15) {
              layer.bindTooltip(feature.properties.p_name, {
                permanent: true,
                direction: 'center',
                className: 'leaflet-tooltip1'
              });
            }
          }*/
      }
    );
    /*this.ilotService.getIlotByZone({north: map.getBounds().getNorthEast(), south: map.getBounds().getSouthWest()}).subscribe(
      (res: any) => {
        res.data = res.data.map(il => {
          il.da = JSON.parse(il.da);
          il.da.geometry = JSON.parse(il.da.geometry);
          return il.da;
        });
        new GeoJSON(res.data, {
          style: (geom) => {
            if (geom.properties.has_incident) {
              return this.style_incident;
            }
            return this.style;
          },
          onEachFeature: (feature: Feature, layer: Layer) => {
            if (map.getZoom() > 15) {
              layer.bindTooltip(feature.properties.p_name, {
                permanent: true,
                direction: 'center',
                className: 'leaflet-tooltip1'
              });
            }
          }
        }).on('click', (ev: LeafletEvent) => {
          const e: any = ev;
          const layer = e.layer.feature.properties;
          this.ilot_info = this.getParcelInfo(layer);
          this.show_parcel_info = true;
        }).addTo(map);


        // this.loadingVisible = false;
        /!*res.data.forEach(ilot => {
          const geom = JSON.parse(ilot.da);
          console.log(geom);
          console.log(this.map);
          const polygon = new Polygon(geom.coordinates, {color: '#06A214'});
          map.addLayer(polygon);
        });*!/
        /!*
        * ,
          onEachFeature: (feature: Feature, layer: Layer) => {
            if (map.getZoom() > 15) {
              layer.bindTooltip(feature.properties.p_name, {
                permanent: true,
                direction: 'center',
                className: 'leaflet-tooltip1'
              });
            }
          }*!/
      }
    );*/
    // --------------------------------------------------------------------------------------------------------------- //
  };

  onSelectionChanged = (e: any) => {
    this.carte.flyTo(JSON.parse(e.addedItems[0].center));
  };

  show = (name: string) => {
    this.router.navigate(['/']);
  };

  getParcelInfo = (layer: any) => {
    return {
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
  };
}
