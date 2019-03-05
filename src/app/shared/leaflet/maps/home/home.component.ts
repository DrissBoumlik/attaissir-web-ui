import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as L from 'leaflet';
import {
    GeoJSON,
    latLng,
    Layer,
    LayerGroup,
    LeafletEvent,
    Map,
    Marker,
    MarkerOptions,
    Polygon,
    polygon,
    Polyline
} from 'leaflet';
import 'leaflet.markercluster';
import {ZonesService} from '../../../../modules/contracts/services/zones.service';
import {CarteService} from '../../../../modules/cartographie/carte.service';
import '../../../../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';
import {GpsService} from '../../../services/gps.service';
import {LayersControl, NavLinkOptions} from '../../helpers/layersControl';
import '../../services/MovingMarker';
import '../../services/rotatedMarker';
import '../../../../../assets/leaflet-sidebar/side-bar';
import {LineString, MultiLineString} from 'geojson';
import * as geojson from 'geojson';

declare module 'leaflet' {
    namespace control {
        function fullscreen(v: any);
    }
    namespace marker {
        function slideTo(v: any, o: any);
    }
    namespace Marker {
        function bindLabel(v: any);
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
            this.drawTrackerHistory(this.customHistory.tracer,
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
    contextMenuOptions = LayersControl.contextMenuOptions;
    /*----------------------Dates--------------------------*/
    today = new Date();
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
    style_harvest_convocated = LayersControl.styles.style_harvest_convocated;
    style_harvest_done = LayersControl.styles.style_harvest_done;
    style_harvest_inprogress = LayersControl.styles.style_harvest_inprogress;
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
    allowCreatePolygon: any = false;
    selectedHistoryVehicle: Number;

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
    }

    // --------------------------------------------------------------------------------------------------------------- //
    /*initParcelMap(map: Map) {
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
    }*/

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
            // console.log(layer);
            map.addLayer(e.layer);
            // console.log(JSON.stringify(e.layer.toGeoJSON()));
            this.gpsService.addHarvestPolygon(layer.toGeoJSON(), this.selectedHistoryVehicle)
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
                    if (
                        !map.getBounds().contains(layer.getBounds().getNorthWest())
                        && !map.getBounds().contains(layer.getBounds().getNorthWest())
                        && !map.getBounds().contains(layer.getBounds().getSouthEast())
                        && !map.getBounds().contains(layer.getBounds().getSouthWest())
                    ) {
                        map.removeLayer(layer);
                    }
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

                            if (+geom.properties.type === 1) {
                                if (geom.properties.is_harvest_convocated) {
                                    return this.style_harvest_convocated;
                                }
                                if (geom.properties.is_harvest_inprogress) {
                                    return this.style_harvest_inprogress;
                                }
                                if (geom.properties.is_harvest_done) {
                                    return this.style_harvest_done;
                                }
                            }

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
                        onEachFeature: (feature: any, layer: any) => {
                            let check_semis_layers = false;
                            let check_harvest_layers = false;
                            this.semisLayer.eachLayer((lyr: any) => {
                                if (lyr.getBounds().contains(layer.getBounds().getCenter())) {
                                    check_semis_layers = true;
                                }
                            });
                            this.harvestLayer.eachLayer((lyr: any) => {
                                if (lyr.getBounds().contains(layer.getBounds().getCenter())) {
                                    check_harvest_layers = true;
                                }
                            });
                            layer.bindTooltip(feature.properties.p_name, {
                                permanent: true,
                                direction: 'center',
                                className: 'leaflet-tooltip1'
                            });
                            layer.getTooltip().setOpacity(0);
                            if (!check_semis_layers) {
                                if (+feature.properties.type === 1) {

                                    layer.addTo(this.semisLayer);
                                }
                            }
                            if (!check_harvest_layers) {
                                if (+feature.properties.type === 2) {
                                    layer.addTo(this.harvestLayer);
                                }
                            }

                        }
                    }).on('click', (ev: LeafletEvent) => {
                        const e: any = ev;
                        const layer = e.layer.feature.properties;
                        this.ilot_info = LayersControl.getParcelInfo(layer);
                        this.show_parcel_info = true;
                    });
                    this.loadingVisible = false;
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
                },
                (err: any) => {
                    this.loadingVisible = false;
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
            if (!this.trackers.length) {
                return;
            }
            this.gpsService.getTrackersPosition(this.trackers.map(tracker => tracker.tracker_id)).subscribe(
                (tracker_datas: any[]) => {
                    this.loadingVisible = false;
                    tracker_datas.forEach((tracker_data) => {
                        const tracker = this.trackers.find((tr: any) => tr.tracker_id === tracker_data.id);
                        tracker.data = tracker_data;
                        const icon = L.icon({
                            iconUrl: 'assets/images/truck_small_2.png',
                            iconSize: [20, 40], // size of the icon
                            iconAnchor: [10, 10]
                        });
                        const options: any = {
                            icon,
                            rotationAngle: 180
                        };
                        if (tracker.data.position) {
                            const marker = L.marker(tracker.data.position.coordinates, options);
                            marker.bindTooltip(tracker.ridelle_code, {
                                permanent: true,
                                className: 'leaflet-tooltip2'
                            }).openTooltip();
                            tracker.marker = marker;
                            this.markerClusterGroup.addLayers([marker]);
                        }
                    });
                }, error1 => {
                    console.log(error1);
                    this.loadingVisible = false;
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
                            if (tracker.marker && tracker.marker.options) {
                                tracker.marker.options.rotationAngle = tracker.data.angle + 100;
                                tracker.marker.slideTo(tracker.data.position.coordinates, {
                                    duration: 5000,
                                    keepAtCenter: false
                                });
                            }
                        });
                    }
                );
            }, 5000);
        });


    }

    // --------------------------------------------------------------------------------------------------------------- //

    onCamionClicked(e: any) {
        if (this.currentHistoryData && this.currentHistoryData.polyLine) {
            this.camionsCarte.removeLayer(this.currentHistoryData.polyLine);
            this.allowCreatePolygon = false;
            this.drawOptions.draw.polygon = this.allowCreatePolygon;
        }
        if (e.itemData && e.itemData.data && e.itemData.data.position) {
            this.show_camion_info = true;
        }
        if (!e.itemData.data || e.itemData.data === this.camion_data || !e.itemData.data.position) {
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
        const tracker = this.contextMenuCamionClicked;
        const codeAction = e.itemData.code;
        this.drawTrackerHistory(+tracker.id, codeAction);
    };

    drawTrackerHistory(tracker_id: Number, codeAction: string, start_date = new Date(), end_date = new Date()) {
        this.loadingVisible = true;
        this.gpsService.getTrackerHistory(tracker_id, codeAction, start_date, end_date)
            .subscribe((res: any[]) => {
                this.loadingVisible = false;
                if (!res.length) {
                    return;
                }
                if (this.currentHistoryData.polyLine) {
                    this.selectedHistoryVehicle = null;
                    this.camionsCarte.removeLayer(this.currentHistoryData.polyLine);
                }
                this.currentHistoryData.polyLine = new Polyline([res[0].position.coordinates, res[0].position.coordinates]);
                this.camionsCarte.flyTo(res[0].position.coordinates);
                res.forEach(point => {
                    this.currentHistoryData.polyLine.addLatLng(point.position.coordinates);
                });
                this.camionsCarte.addLayer(this.currentHistoryData.polyLine);
                this.allowCreatePolygon = true;
                this.selectedHistoryVehicle = tracker_id;
            }, (err: any) => {
                this.loadingVisible = false;
                console.log(err);
            });
    }

    onItemContextMenu(e: any) {
        this.contextMenuCamionClicked = e.itemData;
    }
}
