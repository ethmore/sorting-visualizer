import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* insertionSort(array:number[], from: number, to: number): SortingGenerator {
	for (let i = from + 1; i < to; i++) {
		for (let j = i; j > from && (yield compare(j, j - 1)) < 0; j--) {
			yield swap(j, j - 1);
		}
	}
}