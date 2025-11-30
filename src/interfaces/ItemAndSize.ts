import itemsData from '../assets/data/ItemProtoSet.json';

type Item = (typeof itemsData)[number];
export type ItemAndSize = Item & {
    size: {
        width: number;
        height: number;
    }
}