import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* cocktailSort(array:number[], from: number, to: number): SortingGenerator {
	let swapped: boolean;
	do {
		swapped = false;
		to--;
		for (let j = from; j < to; j++) {
			if ((yield compare(j, j + 1)) > 0) {
				yield swap(j, j + 1);
				swapped = true;
			}
		}
		if (!swapped) {
			break;
		}
		swapped = false;
		from++;
		for (let j = to - 1; j >= from; j--) {
			if ((yield compare(j, j - 1)) < 0) {
				yield swap(j, j - 1);
				swapped = true;
			}
		}
	} while (swapped);
}