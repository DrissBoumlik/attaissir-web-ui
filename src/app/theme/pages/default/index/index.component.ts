import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { ThirdsService } from '../../../../modules/thirds/services/thirds.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit, AfterViewInit {
  shortcutsList: any;
  tilesList: any;
  tenants: any = [];
  tenant: any = [];
  tenant_name: any = [];
  date: any;

  constructor(private _script: ScriptLoaderService,
    private thirdsService: ThirdsService) {

    const event = new Date(Date.now());
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.date = event.toLocaleDateString('fr-FR', options);
  }

  ngOnInit() {

    const urlParams = [];
    window.location.search.replace('?', '').split('&').forEach(function(e, i) {
      const p = e.split('=');
      urlParams[p[0]] = p[1];
    });

    // We have all the params now -> you can access it by name

    if (urlParams['loaded']) { } else {

      const win = (window as any);
      win.location.search = '?loaded=1';
    }


    const data = JSON.parse(localStorage.getItem('currentUser'));
    this.tenants = data.data.tenants;


    this.tenant = localStorage.getItem('tenantId');


    this.tenant_name = this.tenants.filter(x => x.division_id === this.tenant);


    // this.tenant_name = this.tenants

    // var _this = this;
    this.thirdsService.getStats().subscribe(
      (data: any) => {
        this.tilesList = [
          {
            title: 'Contrats confirmés',
            subTitle: 'Nombre de contrats confirmés',
            value: data['actif'] + data['inactif'],
            unit: '',
            icon: 'flaticon-interface-5',
            url: '',
            backgroundColor: '',
            textColor: ''
          },
          {
            title: 'Contrats en cours',
            subTitle: 'Nombre de contrats en cours',
            value: data['encours'],
            unit: '',
            icon: 'flaticon-interface-9',
            url: '',
            backgroundColor: '',
            textColor: ''
          },
          {
            title: 'Superficie contractée',
            subTitle: 'Totale superficie contractée',
            value: `${data['sup_contracted']} (ha)`,
            unit: '',
            icon: 'flaticon-background',
            url: '',
            backgroundColor: '',
            textColor: ''
          },
          {
            title: 'Agrégés',
            subTitle: 'Nombre des agrégés',
            value: data['aggregated'],
            unit: '',
            icon: 'flaticon-users',
            url: '',
            backgroundColor: '',
            textColor: ''
          }
        ];
      });
    this.shortcutsList = [
      {
        title: 'Ajouter un nouveau contrat d\'agrégation',
        icon: 'flaticon-interface-6',
        url: '/contrats/ajouter',
        color: ''
      },
      {
        title: 'Liste des cartes des agrégés',
        icon: 'flaticon-tabs',
        url: '/cartes/liste',
        color: ''
      }
    ];

    // Weather widget
    const geoUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAakT7k-8wOIl2UDTZfVrFs-XjLdO9Gvyk';
    const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?';

    function makePostRequest(url) {
      return new Promise(
        (resolve, reject) => {
          const request = new XMLHttpRequest();
          request.open('POST', url);
          request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          request.responseType = 'json';
          request.onload = (function() {
            if (this.status >= 200 && this.status < 300) {
              resolve(request.response);
            } else {
              reject({
                status: this.status,
                statusText: request.statusText
              });
            }
          });
          request.onerror = (function() {
            reject({
              status: this.status,
              statusText: request.statusText
            });
          });
          request.send();
        }
      );
    }

    function getGeoData(url) {
      return makePostRequest(url);
    }

    function sendWeatherRequest(latLngObj) {
      const urlForWeatherRequest = weatherUrl + 'lat=' + latLngObj.lat + '&lon='
        + latLngObj.lng + '&APPID=' + '163f98f0d415aec0ceb630bc76fbdd1d' + '&units=metric';
      return makePostRequest(urlForWeatherRequest);
    }

    function getWeatherData() {
      return getGeoData(geoUrl)
        .then((response) => {
          const lat = response['location'].lat,
            lng = response['location'].lng;
          return {
            lat,
            lng
          };
        })
        .then((latAndLng) => {
          return sendWeatherRequest(latAndLng)
            .then((weatherResponse) => {
              return weatherResponse;
            });
        });
    }


    /*
    getWeatherData().then((res) => {
      const mainCond = res['weather'][0].main.toLowerCase();
      updateLocation(res['name']);
      updateTemperature(Math.round(res['main'].temp));
    }); */

    function updateLocation(location) {
      const place = document.getElementById('w-city');
      place.innerHTML = location;
    }

    function updateTemperature(value) {
      const temperatureCont = document.getElementById('w-temp');
      temperatureCont.innerHTML = value;
    }

    setTimeAndDate();

    function setTimeAndDate() {
      const hourCont: any = document.getElementById('w-date-hour'),
        dayw: any = document.getElementById('w-day'),
        date = new Date,
        hours = date.getHours(),
        minutes = date.getMinutes(),
        day = date.getDate(),
        month = date.getMonth() + 1;
      let dayOfWeek: any = date.getDay();
      dayOfWeek = ((value) => {
        switch (value) {
          case 1:
            return 'Lundi';
          case 2:
            return 'Mardi';
          case 3:
            return 'Mercredi';
          case 4:
            return 'Jeudi';
          case 5:
            return 'Vendredi';
          case 6:
            return 'Samedi';
          default:
            return 'Dimanche';
        }
      })(dayOfWeek);
      if (hourCont) {
        hourCont.innerHTML = addZeroBefore(hours) + ':' + addZeroBefore(minutes);
        dayw.innerHTML = dayOfWeek;
      }
    }

    function addZeroBefore(n) {
      return (n < 10 ? '0' : '') + n;
    }

  }


  ngAfterViewInit() {
    this._script.loadScripts('app-index',
      ['assets/app/js/dashboard.js']);


  }

}
