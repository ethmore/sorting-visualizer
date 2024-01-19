import { compare, swap, SortingGenerator } from "../utils/SortingVisualizer";

export default function* gnomeSort(array:number[], from: number, to: number): SortingGenerator {
	let pos = from;
	while (pos < to) {
		if (pos === from || (yield compare(pos, pos - 1)) > 0) {
			pos++;
		} else {
			yield swap(pos, pos - 1);
			pos--;
		}
	}
}
