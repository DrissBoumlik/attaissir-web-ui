import {Component, OnInit} from '@angular/core';
import {circle, icon, latLng, marker, polygon, tileLayer} from 'leaflet';
import {ZonesService} from '../../../../modules/contracts/services/zones.service';


@Component({
  selector: 'app-home-leaflet',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class LeafLetHomeComponent implements OnInit {

  cdas: any = {};

  options = {
    layers: [
      tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 17,
          attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS,' +
          ' AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })
    ],
    zoom: 16,
    center: latLng(32.6207256, -8.4743214)
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Leaflet, openstreetmap.'
      }),

      'google': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS,' +
        ' AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }),
    },
    overlays: {
      'Big Circle': circle([46.95, -122], {radius: 5000}),
      'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]]),
      'marker': marker([46.879966, -121.726909], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'https://image.flaticon.com/icons/svg/33/33622.svg',
        })
      }),
    }
  };

  layers = [
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
  ];

  constructor(private zonesService: ZonesService) {
    /*this.dataSource = service.getDataSource();*/
  }

  ngOnInit() {
    this.zonesService.getCDAs().subscribe((res: any) => {
      this.cdas = res.data;
    });
  }

  listSelectionChanged = (e) => {
    /*this.currentHotel = e.addedItems[0];*/
  }

}
