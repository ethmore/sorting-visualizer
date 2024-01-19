import { SortingGenerator, compare, get, set } from "../utils/SortingVisualizer";

export function* mergeInMemory(from: number, to: number, split: number): SortingGenerator {
    let a = from;
    let b = split;
    let output = [];
    while (a < split && b < to) {
        if ((yield compare(a, b)) < 0) {
            if (b === split) {
                from++;
            } else {
                output.push(yield get(a));
            }
            a++;
        } else {
            output.push(yield get(b));
            b++;
        }
    }
    for (; a < split; a++) {
        output.push(yield get(a));
    }
    if (output.length > 0) {
        for(let i =0; i <output.length; i++){
            yield set(from + i, output[i]);

        }
    }
}
export default function* mergeSortInMemory(
    array: number[],
    from: number,
    to: number
): SortingGenerator {
    const length = to - from;
    if (length <= 1) return;

    const split = from + Math.floor(length / 2);
    yield* mergeSortInMemory(array, from, split);
    yield* mergeSortInMemory(array, split, to);
    yield* mergeInMemory(from, to, split);
}
