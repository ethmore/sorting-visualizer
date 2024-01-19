import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* inPlaceMergeSort(array:number[], from: number, to: number): SortingGenerator {
    const length = to - from;
    if (length <= 1) {
        return;
    }

    const split = from + Math.floor(length / 2);
    yield* inPlaceMergeSort(array, from, split);
    yield* inPlaceMergeSort(array, split, to);

    let start = from;
    let mid = split;
    let start2 = split;
    while (start < mid && start2 < to) {
        if ((yield compare(start, start2)) < 0) {
            start++;
        } else {
            let index = start2;

            while (index !== start) {
                yield swap(index - 1, index);
                index--;
            }
            yield swap(start, index);

            start++;
            mid++;
            start2++;
        }
    }
}
