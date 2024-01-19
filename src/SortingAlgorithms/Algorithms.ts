import bubbleSort from "../SortingAlgorithms/BubbleSort";
import selectionSort from "../SortingAlgorithms/SelectionSort";
import quickSort from "../SortingAlgorithms/QuickSort";
import insertionSort from "../SortingAlgorithms/InsertionSort";
import inPlaceMergeSort from "./InPlaceMergeSort";
import shellSort from "../SortingAlgorithms/ShellSort";
import binaryInsertionSort from "../SortingAlgorithms/BinaryInsertionSort";
import bogoSort from "../SortingAlgorithms/BogoSort";
import cocktailSort from "../SortingAlgorithms/CocktailSort";
import combsort from "../SortingAlgorithms/CombSort";
import gnomeSort from "../SortingAlgorithms/GnomeSort";
import oddEvenSort from "../SortingAlgorithms/OddEvenSort";
import heapSort from "./HeapSort";
import bucketSort from "./BucketSort";
import radixSort from "./RadixSort";
import mergeSortInMemory from "./MergeSort";
import timSort from "./TimSort";

export const algoritms = {
    "Bubble Sort": bubbleSort,
    "Selection Sort": selectionSort,
    "Quick Sort": quickSort,
    "Insertion Sort": insertionSort,
    "Shell Sort": shellSort,
    "Heap Sort": heapSort,
    "Comb Sort": combsort,
    "Gnome Sort": gnomeSort,
    "Cocktail Sort": cocktailSort,
    "Odd Even Sort": oddEvenSort,
    "Bogo Sort": bogoSort,
    "Bucket Sort": bucketSort,
    "Radix Sort": radixSort,

    "Merge Sort": mergeSortInMemory,
    "In-Place Merge Sort": inPlaceMergeSort,
    "Binary Insertion Sort": binaryInsertionSort,
    "Tim Sort": timSort,
};

export const SetterAlgorithms = {
    "Bucket Sort": bucketSort,
    "Radix Sort": radixSort,
    "Merge Sort": mergeSortInMemory,
    "Tim Sort": timSort,
}