import { browser, by, element } from 'protractor';

export class SonovatetestClientsPage {
  navigateTo() {
    return browser.get('/clients');
  }

  getClientsElement () {
    return element (by.css ('app-root app-client-list ul#clientList'));
  }
}
