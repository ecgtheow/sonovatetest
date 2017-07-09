import { SonovatetestClientsPage } from './clients.po';

describe ('sonovatetest Clients', () => {
  let page: SonovatetestClientsPage;

  beforeAll (() => {
    page = new SonovatetestClientsPage();
    page.navigateTo ();
  });

  it ('should display a list of clients', () => {
    expect (page.getClientsElement ()).toBeDefined ();
  });
});
