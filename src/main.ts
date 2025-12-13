
document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore por si TS se queja
  window.HSStaticMethods?.autoInit();
});

import { BuildPlacer } from "./BuildPlacer";
import { loadButtons } from "./buildsLoader";
import { initContextMenu } from "./contextMenuEvents";
import type { ItemAndSize } from "./interfaces/ItemAndSize";
import { ToolMode } from "./interfaces/ToolMode";

import {
    CELL_SIZE,
    DEFAULT_ZOOM_INDEX,
    viewState,
    ZOOM_LEVELS,
} from "./viewState";

const canvas = document.getElementById("layoutGrid") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const rect = canvas.getBoundingClientRect();

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let lastMousePosX = 0;
let lastMousePosY = 0;
let currentMode: ToolMode | null = null;

const buildPlacer = new BuildPlacer(canvas, viewState);
const placedBuildDropdown = document.getElementById("placedBuildDropdown") as HTMLDivElement;

let isMouseDown = false;

window.addEventListener("DOMContentLoaded", () => {
    initContextMenu(buildPlacer);
})

function drawGrid() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#d6d6d6ff";

    const zoom = viewState.selectedZoom;
    const zoomedStep = CELL_SIZE * zoom;

    const camXScreen = viewState.cameraX * zoom;
    const camYScreen = viewState.cameraY * zoom;

    const offsetNextLineX =
        (zoomedStep - (camXScreen % zoomedStep) + zoomedStep) % zoomedStep;
    const offsetNextLineY =
        (zoomedStep - (camYScreen % zoomedStep) + zoomedStep) % zoomedStep;

    for (let x = offsetNextLineX; x <= canvasWidth; x += zoomedStep) {
        const px = Math.round(x) + 0.5;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, canvasHeight);
        ctx.stroke();
    }

    for (let y = offsetNextLineY; y <= canvasHeight; y += zoomedStep) {
        const py = Math.round(y) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(canvasWidth, py);
        ctx.stroke();
    }

    drawOriginMarker();

    buildPlacer.drawAllPlacedBuilds(ctx);

    if (currentMode === ToolMode.PlaceBuild) {
        buildPlacer.drawGhost(ctx);
    }
}

canvas.addEventListener("mousedown", (e) => {
    isMouseDown = true;

    if (currentMode !== ToolMode.PlaceBuild) {
        currentMode = ToolMode.Pan;
    }
    lastMousePosX = e.clientX;
    lastMousePosY = e.clientY;

    const activeBuild = buildPlacer.getActiveBuild();
    if(activeBuild) { 
    }

    if(placedBuildDropdown.style.display !== "none") {
        placedBuildDropdown.style.display = "none";
    }
});

canvas.addEventListener("mouseup", (e: MouseEvent) => {
    if (currentMode === ToolMode.PlaceBuild && buildPlacer.getActiveBuild()) {
        buildPlacer.handleClick(e, buildPlacer.getActiveBuild()!);
    }

    currentMode = null;
    isMouseDown = false;
});

canvas.addEventListener("mouseleave", () => {
    currentMode = null;
    isMouseDown = false;
});

canvas.addEventListener("mousemove", (e) => {

    const hovered = buildPlacer.placedBuildHovered(e.clientX, e.clientY);
    buildPlacer.setHoveredBuild(hovered);

    if (currentMode === ToolMode.Pan) {
        console.log(e.clientX)
        const dx = e.clientX - lastMousePosX;
        const dy = e.clientY - lastMousePosY;

        const zoom = viewState.selectedZoom;

        viewState.cameraX -= dx / zoom;
        viewState.cameraY -= dy / zoom;

        lastMousePosX = e.clientX;
        lastMousePosY = e.clientY;
    } else if (currentMode === ToolMode.PlaceBuild) {
        // ghost
        buildPlacer.handleMouseMove(e);

        const active = buildPlacer.getActiveBuild();
        if(isMouseDown && active) {
            buildPlacer.handleBrush(e, buildPlacer.getActiveBuild()!);
        }else {

        }
    }
});


canvas.addEventListener("wheel", (e) => {
    e.preventDefault();

    const oldZoom = viewState.selectedZoom;

    if (ZOOM_LEVELS[viewState.zoomIndex] === undefined) return;

    if (e.deltaY > 0 && viewState.zoomIndex > 0) {
        viewState.zoomIndex--;
    } else if (e.deltaY < 0 && viewState.zoomIndex < ZOOM_LEVELS.length - 1) {
        viewState.zoomIndex++;
    }

    const newZoom = ZOOM_LEVELS[viewState.zoomIndex];
    viewState.oldZoom = oldZoom;
    viewState.selectedZoom = newZoom;

    const rect = canvas.getBoundingClientRect();

    const canvasMouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const canvasMouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

    // mundo del ratón antes del zoom
    const worldMouseX = viewState.cameraX + canvasMouseX / oldZoom;
    const worldMouseY = viewState.cameraY + canvasMouseY / oldZoom;

    // ajustamos la cámara para que ese punto del mundo siga bajo el cursor
    viewState.cameraX = worldMouseX - canvasMouseX / newZoom;
    viewState.cameraY = worldMouseY - canvasMouseY / newZoom;
});

const resetBtn = document.getElementById("resetCamera") as HTMLButtonElement;
resetBtn.addEventListener("click", () => {
    resetCamera();
});

const resetZoom = document.getElementById("resetZoom") as HTMLButtonElement;
resetZoom.addEventListener("click", () => {
    viewState.zoomIndex = DEFAULT_ZOOM_INDEX;
    viewState.selectedZoom = ZOOM_LEVELS[DEFAULT_ZOOM_INDEX];
    viewState.oldZoom = viewState.selectedZoom;
});

const removeAllBuildsBtn = document.getElementById("removeAllBuilds") as HTMLButtonElement;
removeAllBuildsBtn.addEventListener("click", () => {
    buildPlacer.removeAllPlacedBuilds();
})


function drawOriginMarker() {
    const zoom = viewState.selectedZoom;

    // WORLD ORIGIN (0,0)
    const screenX = (0 - viewState.cameraX) * zoom;
    const screenY = (0 - viewState.cameraY) * zoom;

    if (
        screenX >= 0 &&
        screenX <= canvasWidth &&
        screenY >= 0 &&
        screenY <= canvasHeight
    ) {
        ctx.beginPath();
        ctx.fillStyle = "#d6d6d6ff";
        ctx.arc(screenX, screenY, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("buildSelected", ((e: Event) => {
    const customEvent = e as CustomEvent<ItemAndSize>;
    const build = customEvent.detail;

    buildPlacer.setActiveBuild(build);
    currentMode = ToolMode.PlaceBuild;
}) as EventListener);

function main() {
    loadButtons();
    resizeCanvas();
    resetCamera();
}

function resetCamera() {
    const zoom = viewState.selectedZoom;

    // Queremos que el origen del mundo (0,0) quede en el centro del canvas
    viewState.cameraX = -canvasWidth / (2 * zoom);
    viewState.cameraY = -canvasHeight / (2 * zoom);
}
function loop() {
    drawGrid();
    requestAnimationFrame(loop);
}

main();
loop();
