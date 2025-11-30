import type { viewStateType } from "./interfaces/viewStateType";

export const CELL_SIZE = 32;
export const ZOOM_LEVELS = [0.25, 0.5, 1, 2, 3] as const;
export const DEFAULT_ZOOM_INDEX = 2;

export const viewState: viewStateType = {
  cameraX: 0,
  cameraY: 0,
  zoomIndex: DEFAULT_ZOOM_INDEX,
  selectedZoom: ZOOM_LEVELS[DEFAULT_ZOOM_INDEX],
  oldZoom: ZOOM_LEVELS[DEFAULT_ZOOM_INDEX],
};