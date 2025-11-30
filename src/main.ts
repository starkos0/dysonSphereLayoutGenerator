import { BuildPlacer } from "./BuildPlacer";
import { imageList, loadButtons } from "./buildsLoader";
import type { ItemAndSize } from "./interfaces/ItemAndSize";
import { ToolMode } from "./interfaces/ToolMode";
import type { viewStateType } from "./interfaces/viewStateType";
import { CELL_SIZE, DEFAULT_ZOOM_INDEX, viewState, ZOOM_LEVELS } from "./viewState";
const canvas = document.getElementById("layoutGrid") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const rect = canvas.getBoundingClientRect();

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const ORIGIN_CAMERA_X = canvasWidth / 2;
const ORIGIN_CAMERA_Y = canvasHeight / 2;

viewState.cameraX = ORIGIN_CAMERA_X;
viewState.cameraY = ORIGIN_CAMERA_Y;

let lastMousePosX = 0;
let lastMousePosY = 0;
let isUserDragging = false;

let currentMode: ToolMode = ToolMode.Pan;

const buildPlacer = new BuildPlacer(canvas, viewState);

function drawGrid() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#d6d6d6ff";

    const zoomedStep = CELL_SIZE * viewState.selectedZoom;

    const offsetNextLineX = ((viewState.cameraX % zoomedStep) + zoomedStep) % zoomedStep;
    const offsetNextLineY = ((viewState.cameraY % zoomedStep) + zoomedStep) % zoomedStep;

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

    if(currentMode === ToolMode.PlaceBuild) {
      buildPlacer.drawGhost(ctx);
    }
}

canvas.addEventListener("mousedown", (e) => {
    isUserDragging = true;
    lastMousePosX = e.clientX;
    lastMousePosY = e.clientY;
});

canvas.addEventListener("mouseup", () => {
    isUserDragging = false;
});

canvas.addEventListener("mouseleave", () => {
    isUserDragging = false;
});

canvas.addEventListener("mousemove", (e) => {

    if(currentMode === ToolMode.Pan) {
      const dx = e.clientX - lastMousePosX;
      const dy = e.clientY - lastMousePosY;
  
      viewState.cameraX += dx;
      viewState.cameraY += dy;
  
      lastMousePosX = e.clientX;
      lastMousePosY = e.clientY;
    } else if(currentMode === ToolMode.PlaceBuild) {
      buildPlacer.handleMouseMove(e);
    }
});

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  
  if(ZOOM_LEVELS[viewState.zoomIndex] === undefined) return;
  viewState.oldZoom = viewState.selectedZoom;

  if(e.deltaY > 0 && viewState.zoomIndex > 0) {
    viewState.zoomIndex--;
  }else if(e.deltaY < 0 && viewState.zoomIndex < ZOOM_LEVELS.length - 1) {
    viewState.zoomIndex++;
  }

  viewState.selectedZoom = ZOOM_LEVELS[viewState.zoomIndex];
  
  const scale = viewState.selectedZoom / viewState.oldZoom;
  const rect = canvas.getBoundingClientRect();

  // scaled to the actual canvas size
  const canvasMouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
  const canvasMouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

  viewState.cameraX = canvasMouseX - (canvasMouseX - viewState.cameraX) * scale;
  viewState.cameraY = canvasMouseY - (canvasMouseY - viewState.cameraY) * scale;

})

const resetBtn = document.getElementById("resetCamera") as HTMLButtonElement;
resetBtn.addEventListener("click", () => {
    viewState.cameraX = ORIGIN_CAMERA_X;
    viewState.cameraY = ORIGIN_CAMERA_Y;
});

const resetZoom = document.getElementById("resetZoom") as HTMLButtonElement;
resetZoom.addEventListener("click", () => {
  viewState.zoomIndex = DEFAULT_ZOOM_INDEX;
  viewState.selectedZoom = ZOOM_LEVELS[DEFAULT_ZOOM_INDEX];
  viewState.oldZoom = viewState.selectedZoom;
})

function drawOriginMarker() {
    const screenX = viewState.cameraX;
    const screenY = viewState.cameraY;

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

window.addEventListener("resize", resizeCanvas)

window.addEventListener("buildSelected", ((e: Event) => {
  const customEvent = e as CustomEvent<ItemAndSize>;
  const build = customEvent.detail;
  
  buildPlacer.setActiveBuild(build);
}) as EventListener);

function main() {
  loadButtons();
  resizeCanvas();
}

function loop() {
    drawGrid();
    requestAnimationFrame(loop);
}

main();
loop();