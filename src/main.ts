import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { locale, loadMessages } from 'devextreme/localization';
import 'devextreme-intl';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import frMessages from 'node_modules/devextreme/localization/messages/fr.json';


if (environment.production) {
  enableProdMode();
}

loadMessages(frMessages);
locale('fr');

sessionStorage.setItem('locale', 'fr');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
