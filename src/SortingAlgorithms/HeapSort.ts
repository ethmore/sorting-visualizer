import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* heapSort(array:number[], from: number, to: number): SortingGenerator {
    let N = to;

    for (let i = Math.floor(N / 2) - 1; i >= 0; i--) yield* heapify(N, i);

    for (let i = N - 1; i > 0; i--) {
        yield swap(0, i);
        yield* heapify(i, 0);
    }
}

function* heapify(N: number, i: number): SortingGenerator {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < N && (yield compare(l, largest)) > 0) largest = l;
    if (r < N && (yield compare(r, largest)) > 0) largest = r;

    if (largest !== i) {
        yield swap(i, largest);
        yield* heapify(N, largest);
    }
}
