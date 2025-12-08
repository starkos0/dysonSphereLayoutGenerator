import itemsData from "./assets/data/ItemProtoSet.json";
import type { Item } from "./interfaces/Item";
import type { ItemAndSize } from "./interfaces/ItemAndSize";

const images = import.meta.glob("/src/assets/buildsImages/*", {
    eager: true,
    import: "default",
});

export const imageList = Object.keys(images).map((path) => {
    return {
        name: path.split("/").pop() || "",
        src: images[path] as string,
    };
});

export function loadButtons() {
    const buildSelector = document.getElementById("buildSelector");

    itemsData.forEach((item) => {
        if (!item.prefabDesc.isPowerConsumer && !item.prefabDesc.isBelt) return;

        // TODO: size should be specific for each type of build, will be added later on
        const extendedItem: ItemAndSize = {
            ...item,
            size: getItemSize(item),
            realIconPath: '.' + imageList.find(
                (imgData) =>
                    imgData.name.split(".")[0].toLowerCase() ===
                    item.IconPath.split("/")[2]
            )?.src
        };

        const btn = document.createElement("button");
        btn.className =
            "flex items-center justify-center hover:cursor-pointer bg-slate-200 h-14 w-14 rounded-sm shadow-sm hover:bg-slate-400 transition-all";

        const img = document.createElement("img");
        img.src =
            "." +
            imageList.find(
                (imgData) =>
                    imgData.name.split(".")[0].toLowerCase() ===
                    item.IconPath.split("/")[2]
            )?.src;
        img.className = "w-3/4 h-3/4";

        btn.addEventListener("click", () => {
            const event = new CustomEvent("buildSelected", {
                detail: extendedItem,
            });

            window.dispatchEvent(event);
        })

        btn.appendChild(img);
        buildSelector?.appendChild(btn);

    });
}

function getItemSize(item: Item): { width: number, height: number } {
    const size = { width: 3, height: 3 };

    if (item.prefabDesc.isBelt) {
        size.width = 1;
        size.height = 1;
    }
    //rest of build types
    return size;
}