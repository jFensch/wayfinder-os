export type HighlightState = 'Anxious' | 'Flow';
/** All application states including non-highlightable ones */
export type AppState = HighlightState | 'Sad' | 'Shutdown';

export const highlightRegions: Record<HighlightState, string[]> = {
  Anxious: ['leftAmygdala', 'rightAmygdala'],
  Flow: ['leftFrontalLobe', 'rightFrontalLobe'],
};
