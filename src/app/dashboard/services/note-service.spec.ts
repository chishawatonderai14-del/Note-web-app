import { TestBed } from '@angular/core/testing';

import { NoteService } from './note-service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('NoteRetrival', () => {
  let service: NoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(NoteService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
