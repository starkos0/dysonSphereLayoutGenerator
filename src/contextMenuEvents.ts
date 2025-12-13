import type { BuildPlacer } from "./BuildPlacer";

export function initContextMenu(buildPlacer: BuildPlacer) {
    const menu = document.getElementById(
        "placedBuildDropdown"
    ) as HTMLDivElement;
    const canvas = document.getElementById("layoutGrid") as HTMLCanvasElement;

    if (!menu || !canvas) {
        console.error("Menu or canvas not found in DOM");
        return;
    }

    menu.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const action = target.dataset.action;
        if (!action) return;

        menu.style.display = "none";

        switch (action) {
            case "remove":
                removePlacedBuild();
                break;
            case "move":
                movePlacedBuild();
                break;
            case "add-recipe":
                break;
        }
    });

    canvas.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        const hovered = buildPlacer.placedBuildHovered(e.clientX, e.clientY);
        buildPlacer.setHoveredBuild(hovered);

        if (!hovered) {
            menu.style.display = "none";
            return;
        }

        menu.style.display = "block";
        menu.style.position = "absolute";

        let x = e.clientX;
        let y = e.clientY;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const menuRect = menu.getBoundingClientRect();

        if (x + menuRect.width > vw) x = vw - menuRect.width - 20;
        if (y + menuRect.height > vh) y = vh - menuRect.height - 20;

        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
    });

    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target as Node)) {
            menu.style.display = "none";
        }
    });

    function removePlacedBuild() {
        const hovered = buildPlacer.getHoveredBuild();
        
        if (!hovered) {
            console.log("No build selected!");
            return;
        }
        
        buildPlacer.removeBuild(hovered);
    }

    function movePlacedBuild() {
        const hovered = buildPlacer.getHoveredBuild();

        if(!hovered) { 
            console.log("No build selected!");
            return;
        }

    }
}
