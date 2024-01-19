import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* selectionSort(
    array: number,
    from: number,
    to: number
): SortingGenerator {
    for (let i = from; i < to - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < to; j++){
            if((yield compare(j, min_idx)) < 0) {
                 min_idx = j;
            }
        }

        if(min_idx !== i) {
            yield swap(min_idx, i)
        }
    }
}
