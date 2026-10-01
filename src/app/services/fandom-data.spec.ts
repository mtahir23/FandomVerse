import { TestBed } from '@angular/core/testing';
import { FandomData } from './fandom-data';

describe('FandomData', () => {
  let service: FandomData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FandomData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
