import { TestBed, inject } from '@angular/core/testing';

import { ArticleCategiesService } from './article-categies.service';

describe('ArticleCategiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleCategiesService]
    });
  });

  it('should be created', inject([ArticleCategiesService], (service: ArticleCategiesService) => {
    expect(service).toBeTruthy();
  }));
});
