import { MenuRoutingModule } from './menu-routing.module';

describe('MenuRoutingModule', () => {
  let menuRoutingModule: MenuRoutingModule;

  beforeEach(() => {
    menuRoutingModule = new MenuRoutingModule();
  });

  it('should create an instance', () => {
    expect(menuRoutingModule).toBeTruthy();
  });
});
