import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import {ThirdsService} from '../../../../thirds/services/thirds.service';


@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
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
    //var _this = this;
    this.thirdsService.getStats().subscribe(data => {
      console.log(data);
      this.tilesList = [
      {
        title: 'Contrats confirmés',
        subTitle: 'Nombre des contrats confirmés',
        value: data['actif'] + data['inactif'],
        unit:'',
        icon: 'flaticon-interface-5',
        url: '',
        backgroundColor: '',
        textColor: ''
      },
      {
        title: 'Contrats en cours',
        subTitle: 'Nombre des contrats en cours',
        value: data['encours'],
        unit:'',
        icon: 'flaticon-interface-9',
        url: '',
        backgroundColor: '',
        textColor: ''
      },
      {
        title: 'Superficie contractée',
        subTitle: 'Total superficie contractée ',
        value: data['sup_contracted'],
        unit:'',
        icon: 'flaticon-background',
        url: '',
        backgroundColor: '',
        textColor: ''
      },
      {
        title: 'Agriculteurs',
        subTitle: 'Nombre des agriculteurs',
        value: data['aggregated'],
        unit:'',
        icon: 'flaticon-users',
        url: '',
        backgroundColor: '',
        textColor: ''
      }
    ]
    });
    this.shortcutsList = [
      {
        title: 'Ajouter un nouveau agrégé',
        icon: 'flaticon-avatar',
        url: '/tiers/ajouter',
        color: ''
      },
      {
        title: 'Ajouter une nouvelle contrat d\'agrégation',
        icon: 'flaticon-interface-6',
        url: '/contrats/ajouter',
        color: ''
      },
      {
        title: 'Liste des cartes agriculteurs',
        icon: 'flaticon-tabs',
        url: '/contrats/cards',
        color: ''
      }
    ]
    
    // Weather widget
         let geoUrl = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCbrcHPlSrzV06iOFSMXLvGOnOUSyv5UvE";
      let weatherUrl = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?';
      
      function makePostRequest(url) {
        return new Promise(
          (resolve, reject) => {
            let request = new XMLHttpRequest();
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
        )
      }
      
      function getGeoData(url) {
        return makePostRequest(url)
      }
      
      function sendWeatherRequest(latLngObj) {
        let urlForWeatherRequest = weatherUrl + "lat=" + latLngObj.lat + "&lon=" + latLngObj.lng + "&APPID=" + "163f98f0d415aec0ceb630bc76fbdd1d" + "&units=metric";
        return makePostRequest(urlForWeatherRequest);
      }
      
      function getWeatherData() {
        return getGeoData(geoUrl)
          .then((response) => {
            let lat = response['location'].lat,
                lng = response['location'].lng;
            return {
              lat,
              lng
            }
          })
          .then((latAndLng) => {
            return sendWeatherRequest(latAndLng)
              .then((weatherResponse) => {
                return weatherResponse;
              })
          })
      }

      getWeatherData().then( (res)=>{
        let mainCond = res['weather'][0].main.toLowerCase();  
        console.log(res);
        updateLocation(res['name']);
        updateTemperature(Math.round(res['main'].temp));
      })
      
      function updateLocation(location){
        let place = document.getElementById('w-city');
        place.innerHTML = location;
      }
      function updateTemperature(value){
        let temperatureCont = document.getElementById('w-temp');
        temperatureCont.innerHTML = value;
      }

      setTimeAndDate();
      function setTimeAndDate(){
        let hourCont = document.getElementById('w-date-hour'),
            dayw = document.getElementById('w-day'),
            date = new Date,
            hours = date.getHours(),
            minutes = date.getMinutes(),
            day = date.getDate(),
            dayOfWeek = date.getDay(),
            month = date.getMonth()+1;
        
        dayOfWeek = (function(value){
          switch (value){
            case 1: return 'Lundi';
            case 2: return 'Mardi';
            case 3: return 'Mercredi';
            case 4: return 'Jeudi';
            case 5: return 'Vendredi';
            case 6: return 'Samedi';
            default: return 'Dimanche';
          };
        })(dayOfWeek);
        
        hourCont.innerHTML = addZeroBefore(hours) + ":" + addZeroBefore(minutes);
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
