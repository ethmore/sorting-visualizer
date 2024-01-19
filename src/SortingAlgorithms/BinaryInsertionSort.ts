import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* binaryInsertionSort(array:number[], from: number, to: number): SortingGenerator {
	for (let i = from + 1; i < to; i++) {
		let low = from;
		let high = i;
		while (low < high - 1) {
			const mid = low + Math.floor((high - low) / 2);
			if ((yield compare(i, mid)) > 0) {
				low = mid;
			} else {
				high = mid;
			}
		}
		for (let k = i; k > high; k--) {
			yield swap(k, k - 1);
		}
		if ((yield compare(high, low)) < 0) {
			yield swap(high, low);
		}
	}
}
