import {Component, Injector} from '@angular/core';
import {ParcelInfoComponent} from './shared/components/parcel-info/parcel-info.component';
import {createCustomElement} from '@angular/elements';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor() {
  }

}

