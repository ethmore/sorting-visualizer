import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* oddEvenSort(array:number[], from: number, to: number): SortingGenerator {
	let swapped: boolean;
	do {
		swapped = false;
		for (let j = from + 1; j < to; j += 2) {
			if ((yield compare(j, j + 1)) > 0) {
				yield swap(j, j + 1);
				swapped = true;
			}
		}
		for (let j = from; j < to; j += 2) {
			if ((yield compare(j, j + 1)) > 0) {
				yield swap(j, j + 1);
				swapped = true;
			}
		}
	} while (swapped);
}