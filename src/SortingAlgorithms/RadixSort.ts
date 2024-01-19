import { get, set, SortingGenerator } from "../utils/SortingVisualizer";

const getNum = (num: number, index: number) => {
    const strNum = String(num);
    let end = strNum.length - 1;
    const foundNum = strNum[end - index];

    if (foundNum === undefined) return 0;
    else return +foundNum;
};

const largestNum = (arr: number[]) => {
    let largest = "0";

    arr.forEach((num) => {
        const strNum = String(num);

        if (strNum.length > largest.length) largest = strNum;
    });

    return largest.length;
};

export default function* radixSort(arr: number[], from:number, to:number): SortingGenerator {
    let maxLength = largestNum(arr);

    for (let i = from; i < maxLength; i++) {
        let buckets: number[][] = Array.from({ length: 10 }, () => []);

        for (let j = from; j < arr.length; j++) {
            let num: number = getNum(arr[j], i);

            if (num !== undefined) buckets[num].push(yield get(j));
        }

        arr = buckets.flat();
        for(let i = from; i < arr.length; i++) {
            yield set(i, arr[i])
        }
    }
};
