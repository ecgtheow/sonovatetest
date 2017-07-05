import { SonovatetestPage } from './app.po';

describe('sonovatetest App', () => {
  let page: SonovatetestPage;

  beforeEach(() => {
    page = new SonovatetestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
