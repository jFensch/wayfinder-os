export type BrainState = 'Flow' | 'Anxious' | 'Sad' | 'Shutdown';

export const highlightRegions: Record<BrainState, string[]> = {
  Anxious: ['leftAmygdala', 'rightAmygdala'],
  Sad: [],
  Shutdown: [],
export type AppState = HighlightState | 'Sad' | 'Shutdown';

export const highlightRegions: Record<HighlightState, string[]> = {
  Anxious: ['leftAmygdala', 'rightAmygdala'],
  Flow: ['leftFrontalLobe', 'rightFrontalLobe'],
};
