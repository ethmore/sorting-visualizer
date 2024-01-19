import { compare, get, set, SortingGenerator } from "../utils/SortingVisualizer";

export default function* bucketSort(array: number[], from:number, to:number): SortingGenerator {
    if (array.length === 0) {
        return;
    }

    var i;
    var minValue = 0;
    var maxValue = 0;
    for (i = 1; i < array.length; i++) {
        if ((yield compare(i, minValue))<0) {
            minValue = i; // Input Range
        } 
    }

    for (i = 1; i < array.length; i++) {
        if ((yield compare(i, maxValue))>0) {
            maxValue = i;
        }
    }

    minValue = array[minValue]
    maxValue = array[maxValue]
    let bucketSize = 5;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var buckets = new Array(bucketCount);
    for (i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    for (i = 0; i < array.length; i++) {
        buckets[Math.floor((array[i] - minValue) / bucketSize)].push(yield get(i));
    }

    let index = 0;

    for (i = 0; i < buckets.length; i++) {
        buckets[i] = insertionSort(buckets[i]);
        for (var j = 0; j < buckets[i].length; j++) {
            yield set(index++, buckets[i][j]);
        }
    }

}

function insertionSort(array:number[]) {
    for(var i = 1; i < array.length; i++) {
      for(var j = i - 1; j >= 0 && array[j] > array[j+1]; j--) {
        [array[j+1], array[j]] = [array[j], array[j+1]];
      }
    }
    return array;
  }
