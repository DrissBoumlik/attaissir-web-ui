import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import {GeoJSON, latLng, Layer, LayerGroup, LeafletEvent, Map, Marker, Polygon, polygon, Polyline} from 'leaflet';
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
    trackers: any[] = [];
    // -----------------------Custom History------------------------------
    semisLayer: LayerGroup;
    // -----------------------Custom History------------------------------
    customHistory: any = {};
    trackerEditorOptions = {
        items: this.trackers,
        valueExpr: 'id',
        displayExpr: 'ridelle_code'
    };
    dateTimeEditorOption = {
        pickerType: 'calendar',
        type: 'datetime',
        dataType: 'date'
    };
    customHistoryButtonEditorOption = {
        text: 'Afficher',
        type: 'normal',
        useSubmitBehavior: true,
        onClick: ($event) => {
            this.drawTracketHistory(this.customHistory.tracer,
                'CUSTOM',
                this.customHistory.start_date,
                this.customHistory.end_date);
        }
    };
    // -----------------------Custom History------------------------------
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
        layers: LayersControl.CamionLayersControl.baseLayers.Esri,
        zoom: 12,
        center: latLng(32.382843, -6.694198)
    };
    camionLayersControl: any = LayersControl.CamionLayersControl;
    /*----------------------Styles--------------------------*/
    style = LayersControl.styles.style_main;
    style_cane = LayersControl.styles.style_cane;
    style_incident = LayersControl.styles.style_incident;
    style_harvest_cane = LayersControl.styles.style_harvest_cane;
    style_harvest = LayersControl.styles.style_harvest;
    /*----------------------Data--------------------------*/
    cdas: any = {};
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
    harvestLayer: LayerGroup;

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
        this.camionsCarte.flyTo(JSON.parse(e.addedItems[0].center));
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
            }, (error: any) => {
                console.log(error);
                this.loadingVisible = false;
            }
        );
    }

    // --------------------------------------------------------------------------------------------------------------- //
    initCamionMap(map: Map) {
        // create an operational layer that is empty for now
        this.semisLayer = L.layerGroup().addTo(map);
        this.harvestLayer = L.layerGroup().addTo(map);

        const layerControl = {
            'Parcelles semées': this.semisLayer,
            'Parcelles récoltées': this.harvestLayer// an option to show or hide the layer you created from geojson
        };
        this.camionLayersControl.overlays = layerControl;

        this.onMapReady(map);
        this.camionsCarte = map;
        setTimeout(() => {
            map.invalidateSize(true);
        }, 100);

        map.addEventListener('move', (e) => {
            this.show_parcel_info = false;
            this.show_camion_info = false;

        });

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
        map.on('moveend', () => {
            if (map.getZoom() <= 12) {
                return;
            }
            map.eachLayer((layer: any) => {
                if (layer.feature && layer.feature.properties) {
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
                    const parcels = new GeoJSON(res.data, {
                        style: (geom: any) => {

                            if (geom.properties.has_incident) {
                                return this.style_incident;
                            }
                            if (geom.properties.is_cane) {
                                if (+geom.properties.type === 2) {
                                    return this.style_harvest_cane;
                                }
                                return this.style_cane;
                            }
                            if (+geom.properties.type === 2) {
                                return this.style_harvest;
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
                            if (+feature.properties.type === 1) {
                                layer.addTo(this.semisLayer);
                            }
                            if (+feature.properties.type === 2) {
                                layer.addTo(this.harvestLayer);
                            }
                        }
                    }).on('click', (ev: LeafletEvent) => {
                        const e: any = ev;
                        const layer = e.layer.feature.properties;
                        this.ilot_info = LayersControl.getParcelInfo(layer);
                        this.show_parcel_info = true;
                    });


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

        const ss = polygon(LayersControl.getMapBound(map)).toGeoJSON();
        this.loadingVisible = true;

        map.setZoom(map.getZoom() + 1);
        // --------------------------------------------------------------------------------------------------------------- //
        this.loadingVisible = true;
        this.gpsService.getTrackerList().subscribe((res: any) => {
            this.trackers = res.data;
            this.trackerEditorOptions.items = res.data;
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
                }, error1 => {
                    console.log(error1);
                    this.loadingVisible = false;
                });
        });

        setInterval(() => {
            this.gpsService.getTrackersPosition(this.trackers.map(tracker => tracker.tracker_id)).subscribe(
                (tracker_datas: any[]) => {
                    tracker_datas.forEach((tracker_data) => {
                        const tracker = this.trackers.find((tr: any) => tr.tracker_id === tracker_data.id);
                        tracker.data = tracker_data;
                        if (this.currentPolyLine && this.camion_data.id === tracker_data.id) {
                            this.currentPolyLine.addLatLng(tracker.data.position.coordinates);
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
        if (e.itemData && e.itemData.data) {
            this.show_camion_info = true;
        }
        if (!e.itemData.data || e.itemData.data === this.camion_data) {
            return;
        }
        this.camion_data = e.itemData.data;
        if (this.currentPolyLine) {
            this.camionsCarte.removeLayer(this.currentPolyLine);
        }
        this.currentPolyLine = new Polyline([e.itemData.data.position.coordinates, e.itemData.data.position.coordinates]);
        this.currentPolyLine.addTo(this.camionsCarte);
        this.camionsCarte.flyTo(e.itemData.data.position.coordinates);
    }

    onContextMenuItemClick = (e: any) => {
        console.log(e);
        const tracker = this.contextMenuCamionClicked;
        const codeAction = e.itemData.code;
        this.drawTracketHistory(+tracker.id, codeAction);
    };

    drawTracketHistory(tracker_id: Number, codeAction: string, start_date = new Date(), end_date = new Date()) {
        this.loadingVisible = true;
        this.gpsService.getTrackerHistory(tracker_id, codeAction, start_date, end_date)
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
            }, (err: any) => {
                this.loadingVisible = false;
                console.log(err);
            });
    }

    onItemContextMenu(e: any) {
        this.contextMenuCamionClicked = e.itemData;
    }
}
