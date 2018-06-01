import { Component } from '@angular/core';
import { locale, loadMessages } from 'devextreme/localization';
import 'devextreme-intl';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor() {

    loadMessages('fr');
    locale('fr');

    sessionStorage.setItem('locale', 'fr');
  }
}
