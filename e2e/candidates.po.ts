import { browser, by, element } from 'protractor';

export class SonovatetestCandidatesPage {
  navigateTo() {
    return browser.get('/candidates');
  }

  getCandidatesElement () {
    return element (by.css ('app-root app-candidate-list ul#candidateList'));
  }
}
