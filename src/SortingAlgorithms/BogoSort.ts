import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* bogoSort(array:number[], from: number, to: number): SortingGenerator {
	while (true) {
		let isSorted = true;
		for (let i = from + 1; i < to; i++) {
			if ((yield compare(i - 1, i)) > 0) {
				isSorted = false;
				break;
			}
		}
		if (isSorted) {
			return;
		}
		for (let i = from; i < to - 1; i++) {
			const index = Math.floor(Math.random() * (to - from - i)) + i;
			yield swap(index, i);
		}
	}
}
