import { TsdcPage } from './app.po';

describe('tsdc App', () => {
  let page: TsdcPage;

  beforeEach(() => {
    page = new TsdcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
