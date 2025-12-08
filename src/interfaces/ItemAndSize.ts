import type { Item } from './Item';

export type ItemAndSize = Item & {
    size: {
        width: number;
        height: number;
    },
    realIconPath: string
}