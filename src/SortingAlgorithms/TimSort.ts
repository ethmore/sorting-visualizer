import { SortingGenerator } from "../utils/SortingVisualizer";
import insertionSort from "./InsertionSort";
import { mergeInMemory } from "./MergeSort";

export default function* timSort(array:number[], from: number, to: number): SortingGenerator {
	const length = to - from;
	let run = 32;
	length <= 32 ? run = 8 : run = 32 

	for (let i = from; i < to; i += run) {
		yield* insertionSort([], i, Math.min(to, i + run));
	}
	for (let size = run; size < length; size = 2 * size) {
		for (let beg = 0; beg < length; beg += 2 * size) {
			const mid = beg + size;
			const end = Math.min(beg + 2 * size, length);

			yield* mergeInMemory(from + beg, from + end, from + mid);
		}
	}
}
