export const ToolMode = {
  Pan: 'Pan',
  PlaceBuild: 'PlaceBuild'
} as const;

export type ToolMode = typeof ToolMode[keyof typeof ToolMode];
