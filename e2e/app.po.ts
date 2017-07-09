import { browser, by, element } from 'protractor';

export class SonovatetestPage {
  navigateTo() {
    return browser.get('/');
  }

  getNavElement () {
    return element (by.css ('app-root nav.navbar'));
  }
}
