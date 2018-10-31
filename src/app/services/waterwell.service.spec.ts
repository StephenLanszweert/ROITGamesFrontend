import { TestBed, inject } from '@angular/core/testing';

import { WaterwellService } from './waterwell.service';

describe('WaterwellService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaterwellService]
    });
  });

  it('should be created', inject([WaterwellService], (service: WaterwellService) => {
    expect(service).toBeTruthy();
  }));
});
