import { TestBed, inject } from '@angular/core/testing';

import { DatabaseLinkService } from './database-link.service';

describe('DatabaseLinkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseLinkService]
    });
  });

  it('should be created', inject([DatabaseLinkService], (service: DatabaseLinkService) => {
    expect(service).toBeTruthy();
  }));
});
