import {
    getBuildSize,
    getMouseCordsCanvas,
    getMouseCordsInWorld,
} from "./converters";
import type { ItemAndSize } from "./interfaces/ItemAndSize";
import type { viewStateType } from "./interfaces/viewStateType";
import { CELL_SIZE } from "./viewState";

interface GridPosition {
    x: number; // grid column
    y: number; // grid row
}

export interface PlacedBuild {
    build: ItemAndSize;
    gridPos: GridPosition;
}

export class BuildPlacer {
    private activeBuild: ItemAndSize | null = null;
    private lastMousePos: { x: number; y: number } | null = null;
    public buildsPlaced: PlacedBuild[] = [];
    private hoveredBuild: PlacedBuild | null = null;

    constructor(
        private canvas: HTMLCanvasElement,
        private viewState: viewStateType
    ) {}
    private screenToWorld(sx: number, sy: number) {
        const { cameraX, cameraY, selectedZoom: zoom } = this.viewState;
        return {
            x: cameraX + sx / zoom,
            y: cameraY + sy / zoom,
        };
    }
    private gridToScreen(gridX: number, gridY: number) {
        const { cameraX, cameraY, selectedZoom: zoom } = this.viewState;
        return {
            x: (gridX * CELL_SIZE - cameraX) * zoom,
            y: (gridY * CELL_SIZE - cameraY) * zoom,
        };
    }

    handleMouseMove(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.lastMousePos = { x, y };

        const ctx = this.canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawGhost(ctx);
    }

    handleClick(e: MouseEvent, selectedBuild: ItemAndSize) {
        if (!this.lastMousePos) return;

        // getMouseCordsInWorld
        const mousePosCanvas = getMouseCordsCanvas(e, this.canvas);
        const mousePosWorld = getMouseCordsInWorld(mousePosCanvas);

        const gridX = Math.floor(mousePosWorld.x / CELL_SIZE);
        const gridY = Math.floor(mousePosWorld.y / CELL_SIZE);

        if (this.isGhostColliding(gridX, gridY)) {
            console.log("No se puede colocar, colisión.");
            return;
        }

        this.buildsPlaced.push({
            build: selectedBuild,
            gridPos: { x: gridX, y: gridY },
        });

        this.activeBuild = null;
    }

    drawPlacedBuild(ctx: CanvasRenderingContext2D, placedBuild: PlacedBuild) {
        const buildSize = getBuildSize(
            placedBuild.build.size.width,
            placedBuild.build.size.height
        );

        const img = new Image();
        img.src = placedBuild.build.realIconPath;
        ctx.drawImage(img, screenX, screenY, buildSize.width, buildSize.height);
    }

    drawAllPlacedBuilds(ctx: CanvasRenderingContext2D) {
        const zoom = this.viewState.selectedZoom;
        const { cameraX, cameraY } = this.viewState;

        for (const placedBuild of this.buildsPlaced) {
            const { gridPos, build } = placedBuild;

            const screenX = (gridPos.x * CELL_SIZE - cameraX) * zoom;
            const screenY = (gridPos.y * CELL_SIZE - cameraY) * zoom;

            const buildSize = getBuildSize(
                placedBuild.build.size.width,
                placedBuild.build.size.height
            );

            const img = new Image();
            img.src = build.realIconPath;
            ctx.drawImage(
                img,
                screenX,
                screenY,
                buildSize.width,
                buildSize.height
            );

            if (this.hoveredBuild === placedBuild) {
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 255, 0, 0.3)";
                ctx.fillRect(
                    screenX,
                    screenY,
                    buildSize.width,
                    buildSize.height
                );
            }
            ctx.strokeStyle = "rgb(155, 155, 155)";
            ctx.lineWidth = 0.5;

            ctx.strokeRect(screenX, screenY, buildSize.width, buildSize.height);

            const svgIcon = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 10.27 7 3.34"/>
                <path d="m11 13.73-4 6.93"/>
                <path d="M12 22v-2"/>
                <path d="M12 2v2"/>
                <path d="M14 12h8"/>
                <path d="m17 20.66-1-1.73"/>
                <path d="m17 3.34-1 1.73"/>
                <path d="M2 12h2"/>
                <path d="m20.66 17-1.73-1"/>
                <path d="m20.66 7-1.73 1"/>
                <path d="m3.34 17 1.73-1"/>
                <path d="m3.34 7 1.73 1"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="12" r="8"/>
                </svg>
            `;

            const iconImg = new Image();
            iconImg.src = "data:image/svg+xml;base64," + btoa(svgIcon);
            const zoom2 = this.viewState.selectedZoom;

            const offsetX = 10 * zoom2;
            const offsetY = 10 * zoom2;
            const tagHeight = 20 * zoom2;

            const tagX = screenX + offsetX;
            const tagY = screenY - tagHeight - offsetY;
            const tagW = buildSize.width - offsetX * 2;

            // fondo del tag
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(tagX, tagY, tagW, tagHeight);

            // borde
            ctx.strokeStyle = "white";
            ctx.strokeRect(tagX, tagY, tagW, tagHeight);

            // ---------- ICONO ----------
            const iconSize = 16 * zoom2;
            ctx.drawImage(
                iconImg,
                tagX + 4 * zoom2,
                tagY + (tagHeight - iconSize) / 2,
                iconSize,
                iconSize
            );

            // ---------- TEXTO ----------
            // dejar un margen después del icono
            const textX = tagX + iconSize + 10 * zoom2;

            ctx.font = `${12 * zoom2}px Arial`;
            ctx.fillStyle = "white";
            ctx.textBaseline = "middle";

            ctx.fillText("Hola", textX, tagY + tagHeight / 2);
        }
    }

    drawGhost(ctx: CanvasRenderingContext2D) {
        if (!this.activeBuild || !this.lastMousePos) return;

        const zoom = this.viewState.selectedZoom;
        const { cameraX, cameraY } = this.viewState;
        const { width, height } = this.activeBuild.size;

        const sx = this.lastMousePos.x;
        const sy = this.lastMousePos.y;

        const worldX = cameraX + sx / zoom;
        const worldY = cameraY + sy / zoom;

        const gridX = Math.floor(worldX / CELL_SIZE);
        const gridY = Math.floor(worldY / CELL_SIZE);

        const snappedWorldX = gridX * CELL_SIZE;
        const snappedWorldY = gridY * CELL_SIZE;

        const screenX = (snappedWorldX - cameraX) * zoom;
        const screenY = (snappedWorldY - cameraY) * zoom;

        const ghostW = CELL_SIZE * width * zoom;
        const ghostH = CELL_SIZE * height * zoom;

        const img = new Image();
        img.src = this.activeBuild.realIconPath;

        ctx.globalAlpha = 0.9;
        ctx.drawImage(img, screenX, screenY, ghostW, ghostH);

        const isColliding = this.isGhostColliding(gridX, gridY);

        ctx.globalAlpha = 0.3;
        ctx.fillStyle = isColliding
            ? "rgba(255, 0, 0, 0.25)"
            : "rgba(0, 255, 0, 0.25)";
        ctx.fillRect(screenX, screenY, ghostW, ghostH);

        ctx.globalAlpha = 1;
    }

    isGhostColliding(ghostGridX: number, ghostGridY: number): boolean {
        if (!this.activeBuild) return false;

        const ghostW = this.activeBuild.size.width;
        const ghostH = this.activeBuild.size.height;

        for (const placed of this.buildsPlaced) {
            const px = placed.gridPos.x;
            const py = placed.gridPos.y;
            const pw = placed.build.size.width;
            const ph = placed.build.size.height;

            const noOverlap =
                ghostGridX + ghostW <= px ||
                px + pw <= ghostGridX ||
                ghostGridY + ghostH <= py ||
                py + ph <= ghostGridY;

            if (!noOverlap) {
                return true;
            }
        }

        return false;
    }

    setActiveBuild(build: ItemAndSize) {
        this.activeBuild = build;
        console.log(this.activeBuild.realIconPath);
    }

    getActiveBuild() {
        return this.activeBuild;
    }

    placedBuildHovered(
        mouseClientX: number,
        mouseClientY: number
    ): PlacedBuild | null {
        // 1. client -> canvas
        const rect = this.canvas.getBoundingClientRect();
        const canvasX =
            (mouseClientX - rect.left) * (this.canvas.width / rect.width);
        const canvasY =
            (mouseClientY - rect.top) * (this.canvas.height / rect.height);

        // 2. canvas -> mundo
        const mouseWorldPos = this.screenToWorld(canvasX, canvasY);

        // 3. comprobar contra cada build
        const hovered = this.buildsPlaced.find((placed) => {
            const { gridPos, build } = placed;

            const startX = gridPos.x * CELL_SIZE;
            const startY = gridPos.y * CELL_SIZE;

            const widthPx = build.size.width * CELL_SIZE;
            const heightPx = build.size.height * CELL_SIZE;

            const endX = startX + widthPx;
            const endY = startY + heightPx;

            return (
                mouseWorldPos.x >= startX &&
                mouseWorldPos.x < endX &&
                mouseWorldPos.y >= startY &&
                mouseWorldPos.y < endY
            );
        });

        return hovered ?? null;
    }

    highlightBuild(build: PlacedBuild) {
        const ctx = this.canvas.getContext("2d")!;
        const zoom = this.viewState.selectedZoom;
        const { cameraX, cameraY } = this.viewState;

        // Convertimos grid → mundo → pantalla
        const screenX = (build.gridPos.x * CELL_SIZE - cameraX) * zoom;
        const screenY = (build.gridPos.y * CELL_SIZE - cameraY) * zoom;

        const widthPx = build.build.size.width * CELL_SIZE * zoom;
        const heightPx = build.build.size.height * CELL_SIZE * zoom;

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,0,1)"; // color visible
        ctx.fillRect(screenX, screenY, widthPx, heightPx);
    }

    setHoveredBuild(build: PlacedBuild | null) {
        this.hoveredBuild = build;
    }

    getHoveredBuild() {
        return this.hoveredBuild;
    }
}
