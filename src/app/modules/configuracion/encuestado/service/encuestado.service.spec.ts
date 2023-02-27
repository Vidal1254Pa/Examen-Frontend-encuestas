import { TestBed } from '@angular/core/testing';

import { EncuestadoService } from './encuestado.service';

describe('EncuestadoService', () => {
  let service: EncuestadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncuestadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
