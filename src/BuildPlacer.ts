import type { ItemAndSize } from "./interfaces/ItemAndSize";
import type { viewStateType } from "./interfaces/viewStateType";

export class BuildPlacer {
    private activeBuild: ItemAndSize | null = null;
    private lastMousePos: {x: number, y: number} | null = null;

    constructor(
        private canvas: HTMLCanvasElement,
        private viewState: ViewStateType
    ) {}

    handleMouseMove(e: MouseEvent) {

    }

    handleClick(e: MouseEvent, selectedBuild: ItemAndSize) {

    }

    drawGhost(ctx: CanvasRenderingContext2D) {

    }

    setActiveBuild(build: ItemAndSize) {

    }
}
