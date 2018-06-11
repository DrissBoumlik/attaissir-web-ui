import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { ThirdsService } from '../../../../thirds/services/thirds.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit, AfterViewInit {
  shortcutsList: any;
  tilesList: any;


  constructor(
    private _script: ScriptLoaderService,
    private thirdsService: ThirdsService
  ) {

  }
  ngOnInit() {
    // var _this = this;
    this.thirdsService.getStats().subscribe(data => {
      console.log(data);
      this.tilesList = [
        {
          title: 'Contrats confirmés',
          subTitle: 'Nombre des contrats confirmés',
          value: data['actif'] + data['inactif'],
          unit: '',
          icon: 'flaticon-interface-5',
          url: '',
          backgroundColor: '',
          textColor: ''
        },
        {
          title: 'Contrats en cours',
          subTitle: 'Nombre des contrats en cours',
          value: data['encours'],
          unit: '',
          icon: 'flaticon-interface-9',
          url: '',
          backgroundColor: '',
          textColor: ''
        },
        {
          title: 'Superficie contractée',
          subTitle: 'Totale superficie contractée ',
          value: data['sup_contracted'],
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
        title: 'Ajouter un nouveau agrégé',
        icon: 'flaticon-avatar',
        url: '/tiers/ajouter',
        color: ''
      },
      {
        title: 'Ajouter un nouveau contrat d\'agrégation',
        icon: 'flaticon-interface-6',
        url: '/contrats/ajouter',
        color: ''
      },
      {
        title: 'Liste des cartes agrégés',
        icon: 'flaticon-tabs',
        url: '/tiers/cartes',
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
          console.log(response);
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

    getWeatherData().then((res) => {
      const mainCond = res['weather'][0].main.toLowerCase();
      console.log(res);
      updateLocation(res['name']);
      updateTemperature(Math.round(res['main'].temp));
    })

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
          case 1: return 'Lundi';
          case 2: return 'Mardi';
          case 3: return 'Mercredi';
          case 4: return 'Jeudi';
          case 5: return 'Vendredi';
          case 6: return 'Samedi';
          default: return 'Dimanche';
        }
      })(dayOfWeek);

      hourCont.innerHTML = addZeroBefore(hours) + ':' + addZeroBefore(minutes);
      dayw.innerHTML = dayOfWeek;
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
