import { SonovatetestPage } from './app.po';

describe ('sonovatetest App', () => {
  let page: SonovatetestPage;

  beforeAll (() => {
    page = new SonovatetestPage();
    page.navigateTo ();
  });

  it ('should display a navigation bar', () => {
    expect (page.getNavElement ()).toBeDefined ();
  });
});
