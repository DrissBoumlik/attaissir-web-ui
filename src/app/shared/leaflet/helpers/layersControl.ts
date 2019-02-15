import {Map, tileLayer} from 'leaflet';
import * as L from 'leaflet';

export enum NavLinkOptions {
    PARCELS,
    CAMIONS,
    HISTORY
}


export class LayersControl {
    public static ParcelLayersControl = {
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
            'Semis': null
        }
    };
    public static CamionLayersControl = {
        baseLayers: {
            'CartoDB_DarkMatter': tileLayer('https://{s}.{base}.maps.cit.api.here.com/maptile/2.1/{type}/' +
                '{mapID}/normal.night.grey/{z}/{x}/{y}/{size}/{format}?app_id={app_id}&app_code={app_code}&lg={language}&style=wings', {
                attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com">HERE</a>',
                subdomains: '1234',
                mapID: 'newest',
                app_id: 'LFDFxuH7piXnFpMEhCfS',
                app_code: 'wgD39fkWKD3SNkEBLx_0LQ',
                base: 'base',
                maxZoom: 20,
                type: 'maptile',
                language: 'eng',
                format: 'png8',
                size: '256',
                keepBuffer: 10
            }),
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
        }
    };
    public static drawOptions = {
        position: 'topleft',
        draw: {
            circle: false,
            polyline: false,
            rectangle: false,
            marker: false,
            circlemarker: false,
            polygon: {
                shapeOptions: {
                    color: '#307e3d',
                    fill: true,
                    fillColor: '#45914a',
                    fillOpacity: 0.9
                }
            }
        }
    };
    public static navLinks = [
        {
            id: 1,
            name: 'Camions',
            UNIQUEXP: NavLinkOptions.CAMIONS
        }, {
            id: 2,
            name: 'Historique',
            UNIQUEXP: NavLinkOptions.HISTORY
        }, /*{
            id: 3,
            name: 'Events',
            UNIQUEXP: 'EVENTS'
        },*/ {
            id: 4,
            name: 'Parcelles',
            UNIQUEXP: NavLinkOptions.PARCELS
        }
    ];
    public static styles = {
        style_main: {
            color: '#3d5222',
            fillColor: '#33a114',
            fillOpacity: 1
        },
        style_cane: {
            color: '#524b05',
            fillColor: '#a19b4f',
            fillOpacity: 1
        },
        style_incident: {
            color: '#68090a',
            fillColor: '#ca1214',
            fillOpacity: 1
        },
        style_harvest: {
            color: '#524924',
            fillColor: '#b7ab2d',
            fillOpacity: 1
        },
        style_harvest_cane: {
            color: '#334452',
            fillColor: '#475da1',
            fillOpacity: .7
        }
    };
    public static fullScreen = L.control.fullscreen({
        position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, defaut topleft
        title: 'Plein écran', // change the title of the button, default Full Screen
        titleCancel: 'Quitter le mode plein écran', // change the title of the button when fullscreen is on, default Exit Full Screen
        content: null, // change the content of the button, can be HTML, default null
        forceSeparateButton: true, // force seperate button to detach from zoom buttons, default false
        forcePseudoFullscreen: false, // force use of pseudo full screen even if full screen API is available, default false
        fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
    });

    public static getMapBound(map: Map) {
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
        return latlngs_;
    }

    public static getParcelInfo = (layer: any) => {
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
