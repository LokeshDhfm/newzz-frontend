import { TestBed } from '@angular/core/testing';

import { DataPropagateService } from './data-propagate.service';

describe('DataPropagateService', () => {
  let service: DataPropagateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPropagateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
