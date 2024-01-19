import { useCallback, useEffect, useReducer, useRef, useState } from "react";

// Sorting things
export function compare(a: number, b: number): ["compare", number, number] {
	return ["compare", a, b];
}

export function swap(a: number, b: number): ["swap", number, number] {
	return ["swap", a, b];
}

export function get(a: number): ["get", number] {
	return ["get", a];
}

export function set(
	a: number,
	b: number[] | number
): ["set", number, number[] | number] {
	return ["set", a, b];
}

type Instruction = ReturnType<typeof compare | typeof swap | typeof get | typeof set>;

export type SortingGenerator = Generator<Instruction, void, number>;
function defineSortingSystem(name: string, description: string, options: React.ComponentType<any>) {
	
}

export type Stats = Record<Instruction[0], number>;
type BarEffects = Record<number, string>;
type State = {
	stats: Stats;
	done: boolean;
	displayedArray: number[];
	barEffects: BarEffects;
};

export default function SortingVisualizer(
	baseArray: number[],
	algorithm: (from: number, to: number) => SortingGenerator
	
): State & {
	reset: () => void;
	step: () => Instruction | [null];
} {
	const [resetCount, reset] = useReducer((state) => state + 1, 0);
	const [{ displayedArray, done, barEffects, stats }, setState] = useState<State>({
		displayedArray: [],
		done: true,
		barEffects: {},
		stats: { compare: 0, swap: 0, get: 0, set: 0 },
	});
	const stepRef = useRef<() => Instruction | [null]>(() => [null]);
	useEffect(() => {
		let state: State = {
			displayedArray: baseArray,
			done: false,
			barEffects: {},
			stats: { compare: 0, swap: 0, get: 0, set: 0 },
		};
		setState(state);
		const generator = algorithm(0, state.displayedArray.length);
		let nextValue = 0;
		
		function doStep(): Instruction | [null] {
			const action = generator.next(nextValue);
			if (action.done) {
				if (!state.done) {
					state = {
						...state,
						done: true,
						barEffects: {},
					};
					setState(state);
				}
				return [null];
			} else if (action.value[0] === "compare") {
				const a = state.displayedArray[action.value[1]];
				const b = state.displayedArray[action.value[2]];
				if (a > b) {
					nextValue = 1;
				} else if (a < b) {
					nextValue = -1;
				} else {
					nextValue = 0;
				}
				state = {
					...state,
					barEffects: {
						[action.value[1]]: "red",
						[action.value[2]]: "red"
					},
					stats: { ...state.stats, compare: state.stats.compare + 1 },
				};
				setState(state);
			} else if (action.value[0] === "swap") {
				if (action.value[1] < 0 || action.value[1] >= state.displayedArray.length) {
					throw new Error("First index out of range: " + action.value[1] + ' ' + action.value[2]);
				}
				if (action.value[2] < 0 || action.value[2] >= state.displayedArray.length) {
					throw new Error("Second index out of range: " + action.value[1] + ' ' + action.value[2]);
				}
				const workingArray = [...state.displayedArray];
				const tmp = workingArray[action.value[1]];
				workingArray[action.value[1]] = workingArray[action.value[2]];
				workingArray[action.value[2]] = tmp;
				state = {
					...state,
					displayedArray: workingArray,
					barEffects: {
						[action.value[1]]: "green",
						[action.value[2]]: "green",
					},
					stats: {
						...state.stats,
						swap: state.stats.swap + 1,
					},
				};
				setState(state);
			} else if (action.value[0] === "get") {
				nextValue = state.displayedArray[action.value[1]];
				state = {
					...state,
					barEffects: {
						[action.value[1]]: "yellow"
					},
					stats: {
						...state.stats,
						get: state.stats.get + 1
					}
				};
				setState(state);
			} else if (action.value[0] === "set") {
				const displayedArray = [...state.displayedArray];
				const barEffects:BarEffects = {};
				let length: number;
				if (typeof action.value[2] === "number") {
					displayedArray[action.value[1]] = action.value[2];
					barEffects[action.value[1]] = "blue";
					length = 1;
				} else {
					displayedArray.splice(action.value[1], action.value[2].length, ...action.value[2]);
					length = action.value[2].length;
					for (let i = 0; i < action.value[2].length; i++) {
						barEffects[i + action.value[1]] = "blue";
					}
				}
				(state = {
					...state,
					displayedArray,
					barEffects,
					stats: {
						...state.stats,
						set: state.stats.set + length
					}
				}),
					setState(state);
			} else {
				throw new Error("What? " + JSON.stringify(action.value));
			}
			return action.value;
		}
		stepRef.current = doStep;
	}, [resetCount, baseArray, algorithm]);

	const step = useCallback(() => {
		return stepRef.current();
	}, [stepRef]);

	return {
		displayedArray,
		done,
		barEffects,
		stats,

		step,
		reset,
	};
}
