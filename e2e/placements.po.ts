import { browser, by, element } from 'protractor';

export class SonovatetestPlacementsPage {
  navigateTo() {
    return browser.get('/placements');
  }

  getPlacementsElement () {
    return element (by.css ('app-root app-placement-list ul#placementList'));
  }
}
