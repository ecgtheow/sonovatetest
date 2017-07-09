import { SonovatetestPlacementsPage } from './placements.po';

describe ('sonovatetest Placements', () => {
  let page: SonovatetestPlacementsPage;

  beforeAll (() => {
    page = new SonovatetestPlacementsPage();
    page.navigateTo ();
  });

  it ('should display a list of placements', () => {
    expect (page.getPlacementsElement ()).toBeDefined ();
  });
});
