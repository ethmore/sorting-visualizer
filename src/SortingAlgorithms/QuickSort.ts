import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* quickSort(array:number[], from: number, to: number): SortingGenerator {
    if (to - from <= 1) {
        return;
    }

    let pivot = to - 1;
    let i = from;
    for (let j = from; j < to; j++) {
        if ((yield compare(j, pivot)) < 0) {
            yield swap(j, i);
            i++;
        }
    }
    yield swap(pivot, i);
    yield* quickSort(array, from, i);
    yield* quickSort(array, i + 1, to);
}
