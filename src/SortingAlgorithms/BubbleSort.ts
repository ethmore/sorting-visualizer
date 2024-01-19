import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* bubbleSort(
    arr: number[],
    from: number,
    to: number
): SortingGenerator {
    let swapped: boolean;
    do {
        swapped = false;
        to -= 1;
        for (let j = from; j < to; j++) {
            if ((yield compare(j, j + 1)) > 0) {
                yield swap(j, j + 1);
                swapped = true;
            }
        }
    } while (swapped);
}
