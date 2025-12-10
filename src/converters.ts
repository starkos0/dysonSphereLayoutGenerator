import type { PlacedBuild } from "./BuildPlacer";
import type { ItemAndSize } from "./interfaces/ItemAndSize";
import type { viewStateType } from "./interfaces/viewStateType";
import { CELL_SIZE, viewState } from "./viewState";

export type VectorCords = {
    x: number,
    y: number,
}

export type BuildSize = {
    width: number,
    height: number
}

export function getMouseCordsCanvas(
    e: MouseEvent,
    canvas: HTMLCanvasElement
) {
    const rect = canvas.getBoundingClientRect();

    return { 
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
    }
}

export function getMouseCordsInWorld(
    mouseInCanvas: VectorCords,

) {
    // we only scale the mouse position NOT the camera, that's why we 
    // do mouseInCanvas / selectedZoom
    return {
        x: viewState.cameraX + mouseInCanvas.x / viewState.selectedZoom,
        y: viewState.cameraY + mouseInCanvas.y / viewState.selectedZoom,
    }
}

export function getBuildSize(
    buildCellsWith: number,
    buildCellsHeight: number,
): BuildSize {
    return {
        width: CELL_SIZE * buildCellsWith * viewState.selectedZoom,
        height: CELL_SIZE * buildCellsHeight * viewState.selectedZoom
    } 
}