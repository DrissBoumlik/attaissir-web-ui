import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import {GeoJSON, latLng, Layer, LeafletEvent, Map, Marker, Polygon, polygon, Polyline} from 'leaflet';
import 'leaflet.markercluster';
import {ZonesService} from '../../../../modules/contracts/services/zones.service';
import {CarteService} from '../../../../modules/cartographie/carte.service';
import '../../../../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';
import {GpsService} from '../../../services/gps.service';
import {LayersControl, NavLinkOptions} from '../../helpers/layersControl';
import '../../services/MovingMarker';
import {LineString, MultiLineString} from 'geojson';
import * as geojson from 'geojson';

declare module 'leaflet' {
    namespace control {
        function fullscreen(v: any);
    }
    namespace marker {
        function slideTo(v: any, o: any);
    }
}

@Component({
    selector: 'app-home-leaflet',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class LeafLetHomeComponent implements OnInit {
    links = LayersControl.navLinks;
    drawOptions = LayersControl.drawOptions;
    markerClusterGroup: L.MarkerClusterGroup;
    markerClusterData: any[] = [];
    markerClusterOptions: L.MarkerClusterGroupOptions;
    contextMenuOptions = [
        {
            text: 'Historique',
            icon: 'dx-icon-clock',
            'items': [
                {
                    text: 'Aujourd\'hui',
                    code: 'TODAY'
                },
                {
                    text: 'Hier',
                    code: 'YESTERDAY'
                },
                {
                    text: 'Cette semaine',
                    code: 'WEEK'
                },
                {
                    text: 'Ce mois',
                    code: 'MONTH'
                }
            ],
            action: (e: any) => {
                console.log(e);
            }
        }
    ];
    /*----------------------Dates--------------------------*/
    today = new Date();
    /*----------------------Parcel map options--------------------------*/
    parcelOptions = {
        layers: LayersControl.ParcelLayersControl.baseLayers.Esri,
        zoom: 16,
        center: latLng(32.382843, -6.694198)
    };
    parcelLayersControl = LayersControl.ParcelLayersControl;
    /*----------------------Camion map options--------------------------*/
    camionOptions = {
        layers: LayersControl.CamionLayersControl.baseLayers.CartoDB_DarkMatter,
        zoom: 12,
        center: latLng(32.382843, -6.694198)
    };
    camionLayersControl = LayersControl.CamionLayersControl;
    /*----------------------Styles--------------------------*/
    style = LayersControl.styles.style_main;
    style_cane = LayersControl.styles.style_cane;
    style_incident = LayersControl.styles.style_incident;
    /*----------------------Data--------------------------*/
    cdas: any = {};
    trackers: any[] = [];
    camionsCarte: Map;
    parcelsCarte: Map;
    layer: Layer;
    loadingVisible = true;
    ilot_info: any;
    show_parcel_info = false;
    showCdas = true;
    option = NavLinkOptions.CAMIONS;
    optionHelper = NavLinkOptions;
    currentPolyLine: Polyline<LineString | MultiLineString>;

    /*----------------------CamionData--------------------------*/
    camion_data: any;
    show_camion_info = false;
    currentHistoryData: {
        polyLine: Polyline<geojson.LineString | geojson.MultiLineString>,
        stops
    } = {
        polyLine: null,
        stops: null
    };
    contextMenuCamionClicked: any;

    /*----------------------Styles--------------------------*/
    constructor(private zonesService: ZonesService,
                private ilotService: CarteService,
                private gpsService: GpsService,
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
        this.loadingVisible = false;
        // --------------------------------------------------------------------------------------------------------------- //
        LayersControl.fullScreen.addTo(map);
        map.on('enterFullscreen', () => map.invalidateSize());
        map.on('exitFullscreen', () => map.invalidateSize());
        // --------------------------------------------------------------------------------------------------------------- //
    };
    // --------------------------------------------------------------------------------------------------------------- //
    onSelectionChanged = (e: any) => {
        this.parcelsCarte.flyTo(JSON.parse(e.addedItems[0].center));
    };
    // --------------------------------------------------------------------------------------------------------------- //
    show = (name: string) => {
        this.router.navigate(['/']);
    };

    // --------------------------------------------------------------------------------------------------------------- //
    markerClusterReady(group: L.MarkerClusterGroup) {
        this.markerClusterGroup = group;
    }

    // --------------------------------------------------------------------------------------------------------------- //
    onOptionchanged(option) {
        this.option = option.addedItems[0].UNIQUEXP;
        setTimeout(() => {
            this.camionsCarte.invalidateSize(true);
        }, 100);
        setTimeout(() => {
            this.parcelsCarte.invalidateSize(true);
        }, 100);
    }

    // --------------------------------------------------------------------------------------------------------------- //
    initParcelMap(map: Map) {
        this.onMapReady(map);
        this.parcelsCarte = map;
        setTimeout(() => {
            map.invalidateSize(true);
        }, 100);
        // --------------------------------------------------------------------------------------------------------------- //
        map.addEventListener('move', (e) => {
            this.show_parcel_info = false;
        });

        map.on('draw:created', function (e: any) {
            console.log(e);
            // Do whatever else you need to. (save to db, add to map etc)
            map.addLayer(e.layer);
        });
        // --------------------------------------------------------------------------------------------------------------- //
        map.on('moveend', () => {
            if (map.getZoom() <= 12) {
                return;
            }
            map.eachLayer((layer: any) => {
                if (!layer._url) {
                    map.removeLayer(layer);
                }
            });
            const bounds = polygon(LayersControl.getMapBound(map)).toGeoJSON();
            this.ilotService.getIlotByZone({geom: bounds.geometry}).subscribe(
                (res: any) => {
                    res.data = res.data.map(il => {
                        il.da = JSON.parse(il.da);
                        il.da.geometry = JSON.parse(il.da.geometry);
                        return il.da;
                    });
                    new GeoJSON(res.data, {
                        style: (geom: any) => {
                            if (geom.properties.has_incident) {
                                return this.style_incident;
                            }
                            if (geom.properties.is_cane) {
                                return this.style_cane;
                            }
                            return this.style;
                        },
                        onEachFeature: (feature: any, layer: Layer) => {
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
                        this.ilot_info = LayersControl.getParcelInfo(layer);
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
        const ss = polygon(LayersControl.getMapBound(map)).toGeoJSON();
        this.loadingVisible = true;
        this.ilotService.getIlotByZone({geom: ss.geometry}).subscribe(
            (res: any) => {
                this.loadingVisible = false;
                res.data = res.data.map(il => {
                    il.da = JSON.parse(il.da);
                    il.da.geometry = JSON.parse(il.da.geometry);
                    return il.da;
                });
                new GeoJSON(res.data, {
                    style: (geom: any) => {
                        if (geom.properties.has_incident) {
                            return this.style_incident;
                        }
                        return this.style;
                    },
                    onEachFeature: (feature: any, layer: Layer) => {
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
                    this.ilot_info = LayersControl.getParcelInfo(layer);
                    this.show_parcel_info = true;
                }).addTo(map);
            }
        );
    }

    // --------------------------------------------------------------------------------------------------------------- //
    initCamionMap(map: Map) {
        this.onMapReady(map);
        this.camionsCarte = map;
        setTimeout(() => {
            map.invalidateSize(true);
        }, 100);

        map.on('draw:created', (e: any) => {
            // Do whatever else you need to. (save to db, add to map etc)
            const layer: Polygon = e.layer;
            console.log(layer);
            map.addLayer(e.layer);
            this.gpsService.addHarvestPolygon(layer.toGeoJSON())
                .subscribe(
                    (res: any) => {
                        console.log(res);
                    }
                );
        });
        // --------------------------------------------------------------------------------------------------------------- //
        // --------------------------------------------------------------------------------------------------------------- //
        this.loadingVisible = true;
        this.gpsService.getTrackerList().subscribe((res: any) => {
            this.trackers = res.data;
            this.gpsService.getTrackersPosition(this.trackers.map(tracker => tracker.tracker_id)).subscribe(
                (tracker_datas: any[]) => {
                    this.loadingVisible = false;
                    tracker_datas.forEach((tracker_data) => {
                        const tracker = this.trackers.find((tr: any) => tr.tracker_id === tracker_data.id);
                        tracker.data = tracker_data;
                        const icon = L.icon({
                            iconUrl: 'assets/images/truck.png'
                        });
                        const marker = L.marker(tracker.data.position.coordinates, {icon});
                        tracker.marker = marker;
                        this.markerClusterGroup.addLayers([marker]);
                    });
                });
        });

        setInterval(() => {
            this.gpsService.getTrackersPosition(this.trackers.map(tracker => tracker.tracker_id)).subscribe(
                (tracker_datas: any[]) => {
                    tracker_datas.forEach((tracker_data) => {
                        const tracker = this.trackers.find((tr: any) => tr.tracker_id === tracker_data.id);
                        tracker.data = tracker_data;
                        if (this.currentPolyLine && this.camion_data.id === tracker_data.id) {
                            setTimeout(() => {
                                this.currentPolyLine.addLatLng(tracker.data.position.coordinates);
                            }, 9000);
                        }
                        if (this.camion_data && tracker_data.id === this.camion_data.id) {
                            this.camion_data = tracker_data;
                        }
                        tracker.marker.slideTo(tracker.data.position.coordinates, {
                                duration: 5000,
                                keepAtCenter: false
                            }
                        );
                    });
                }
            );
        }, 5000);
    }

    // --------------------------------------------------------------------------------------------------------------- //

    onCamionClicked(e: any) {
        if (!e.itemData.data) {
            return;
        }
        this.camion_data = e.itemData.data;
        this.show_camion_info = true;
        this.camionsCarte.flyTo(e.itemData.data.position.coordinates);
        if (this.currentPolyLine) {
            this.camionsCarte.removeLayer(this.currentPolyLine);
        }
        this.currentPolyLine = new Polyline([e.itemData.data.position.coordinates, e.itemData.data.position.coordinates]);
        this.currentPolyLine.addTo(this.camionsCarte);
    }

    onContextMenuItemClick = (e: any) => {
        console.log(e);
        const tracker = this.contextMenuCamionClicked;
        const codeAction = e.itemData.code;
        this.drawTracketHistory(+tracker.id, codeAction);
    };

    drawTracketHistory(tracker_id: Number, codeAction: string) {
        this.loadingVisible = true;
        this.gpsService.getTrackerHistory(tracker_id, codeAction)
            .subscribe((res: any[]) => {
                this.loadingVisible = false;
                if (!res.length) {
                    return;
                }
                if (this.currentHistoryData.polyLine) {
                    this.camionsCarte.removeLayer(this.currentHistoryData.polyLine);
                }
                this.currentHistoryData.polyLine = new Polyline([res[0].position.coordinates, res[0].position.coordinates]);
                this.camionsCarte.flyTo(res[0].position.coordinates);
                res.forEach(point => {
                    this.currentHistoryData.polyLine.addLatLng(point.position.coordinates);
                });
                this.camionsCarte.addLayer(this.currentHistoryData.polyLine);
            });
    }

    onItemContextMenu(e: any) {
        this.contextMenuCamionClicked = e.itemData;
    }
}
