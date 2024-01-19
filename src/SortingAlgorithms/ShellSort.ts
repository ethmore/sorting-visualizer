import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* shellSort(array:number[], from: number, to: number): SortingGenerator {
	for (let gap = Math.floor(to/2); gap > 0; gap = Math.floor(gap/2)) {
		for (let i = gap; i < to; i++) {
			for (let j = i; j >= gap && (yield compare(j, j - gap)) < 0; j -= gap) {
				yield swap(j, j - gap);
			}
		}
	}
}