type HighlightState = 'Anxious' | 'Flow';

export const highlightRegions: Record<HighlightState, string[]> = {
  Anxious: ['leftAmygdala', 'rightAmygdala'],
  Flow: ['leftFrontalLobe', 'rightFrontalLobe'],
};
