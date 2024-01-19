import { useCallback, useEffect, useReducer, useRef, useState } from "react";

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

export type Stats = Record<Instruction[0], number>;
type BarEffects = Record<number, string>;
type State = {
    displayedArray: number[];
    done: boolean;
    barEffects: BarEffects;
    stats: Stats;
};

export default function SortingVisualizer(
    array: number[],
    algorithm: (arr: number[], from: number, to: number) => SortingGenerator
): State & {
    step: () => void;
    reset: () => void;
} {
    const [resetCount, reset] = useReducer((state) => state + 1, 0);
    const [{ displayedArray, done, barEffects, stats }, setState] = useState<State>({
        displayedArray: [],
        done: true,
        barEffects: {},
        stats: { compare: 0, swap: 0, get: 0, set: 0 },
    });
    const stepRef = useRef(() => {});

    useEffect(() => {
        let state: State = {
            displayedArray: array,
            done: false,
            barEffects: {},
            stats: { compare: 0, swap: 0, get: 0, set: 0 },
        };
        setState(state);
        const generator = algorithm(state.displayedArray, 0, state.displayedArray.length);
        let nextValue = 0;
        

        function doStep() {
            const action = generator.next(nextValue);
            if (action.done) {
                state = {
                    ...state,
                    done: true,
                    barEffects: {},
                };
                setState(state);
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
                        [action.value[1]]: "#fdba74",
                        [action.value[2]]: "#fdba74",
                    },
                    stats: { ...state.stats, compare: state.stats.compare + 1 },
                };
                setState(state);
            } else if (action.value[0] === "swap") {
                const workingArray = [...state.displayedArray];
                [workingArray[action.value[1]], workingArray[action.value[2]]] = [
                    workingArray[action.value[2]],
                    workingArray[action.value[1]],
                ];
                state = {
                    ...state,
                    displayedArray: workingArray,
                    barEffects: {
                        [action.value[1]]: "#86efac",
                        [action.value[2]]: "#86efac",
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
            			[action.value[1]]: "#d8b4fe"
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
            	let length: number = 1;
                if (typeof action.value[2] === "number") {
            		displayedArray[action.value[1]] = action.value[2];
            		barEffects[action.value[1]] = "#7dd3fc";
            		length = 1;
            	} else {
                    if(typeof action.value[2] === "undefined") {
                    } else {
                        displayedArray.splice(action.value[1], action.value[2].length, ...action.value[2]);
                        length = action.value[2].length;
                        for (let i = 0; i < action.value[2].length; i++) {
                            barEffects[i + action.value[1]] = "#7dd3fc";
                        }
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
            	})
            		setState(state);
            }
            else {
                throw new Error(JSON.stringify(action.value));
            }
        }
        stepRef.current = doStep;
    }, [resetCount, array, algorithm]);

    const step = useCallback(() => {
        stepRef.current();
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
