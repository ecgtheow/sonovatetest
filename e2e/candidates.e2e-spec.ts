import { SonovatetestCandidatesPage } from './candidates.po';

describe ('sonovatetest Candidates', () => {
  let page: SonovatetestCandidatesPage;

  beforeAll (() => {
    page = new SonovatetestCandidatesPage();
    page.navigateTo ();
  });

  it ('should display a list of candidates', () => {
    expect (page.getCandidatesElement ()).toBeDefined ();
  });
});
