import { describe, it, expect } from 'vitest';
import { highlightRegions } from './highlightRegions';

describe('highlightRegions mapping', () => {
  it('maps Anxious state to amygdala regions', () => {
    expect(highlightRegions.Anxious).toContain('leftAmygdala');
    expect(highlightRegions.Anxious).toContain('rightAmygdala');
  });

  it('maps Flow state to frontal lobes', () => {
    expect(highlightRegions.Flow).toContain('leftFrontalLobe');
    expect(highlightRegions.Flow).toContain('rightFrontalLobe');
  });
});
