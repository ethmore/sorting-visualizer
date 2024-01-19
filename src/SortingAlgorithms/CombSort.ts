import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

function getNextGap(gap: number) {
    gap = Math.floor((gap * 10) / 13);
    if (gap < 1) return 1;
    return gap;
}

export default function* combsort(array:number[], from: number, to: number): SortingGenerator {
    let gap = to - from;
    let swapped = true;

    while (gap !== 1 || swapped === true) {
        gap = getNextGap(gap);
        swapped = false;

        for (let i = from; i < to - gap; i++) {
            if ((yield compare(i, i + gap)) > 0) {
                yield swap(i, i + gap);
                swapped = true;
            }
        }
    }
}
