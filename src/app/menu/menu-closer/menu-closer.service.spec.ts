import { TestBed, inject } from '@angular/core/testing';

import { MenuCloserService } from './menu-closer.service';

describe('MenuCloserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuCloserService]
    });
  });

  it('should be created', inject([MenuCloserService], (service: MenuCloserService) => {
    expect(service).toBeTruthy();
  }));
});
