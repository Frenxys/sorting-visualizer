# Sorting Algorithm Visualizer

This project is a sorting algorithm visualizer built using React. It allows users to visually understand how different sorting algorithms work by animating the sorting process with colorful bars representing the data being sorted.

## Features

- Visual representation of various sorting algorithms.
- Interactive controls to adjust the speed of the sorting process.
- Ability to generate new random arrays for sorting.

## Available Sorting Algorithms

Here is a list of sorting algorithms implemented in this visualizer:

1. **Bubble Sort**: A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
2. **Selection Sort**: This algorithm divides the input list into two parts: a sorted and an unsorted part. It repeatedly selects the smallest (or largest) element from the unsorted part and moves it to the sorted part.
3. **Insertion Sort**: Builds a sorted array one element at a time by comparing each new element to the already sorted elements and inserting it in the correct position.
4. **Merge Sort**: A divide-and-conquer algorithm that splits the array into halves, sorts each half, and then merges the sorted halves back together.
5. **Quick Sort**: Another divide-and-conquer algorithm that selects a 'pivot' element and partitions the array into elements less than and greater than the pivot, then recursively sorts the partitions.
6. **Heap Sort**: Converts the array into a heap data structure and then repeatedly extracts the maximum element from the heap and rebuilds the heap until the array is sorted.
7. **Shell Sort**: An optimization of insertion sort that allows the exchange of items that are far apart by comparing elements at a certain gap.
8. **Counting Sort**: An integer sorting algorithm that counts the occurrences of each unique element in the array, then calculates the position of each element in the sorted array.
9. **Radix Sort**: A non-comparison-based sorting algorithm that sorts numbers by processing individual digits. It uses counting sort as a subroutine.
10. **Bucket Sort**: Divides the array into a finite number of buckets, sorts each bucket individually, and then concatenates the results.
11. **Tim Sort**: A hybrid sorting algorithm derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data.
12. **Comb Sort**: An improvement over bubble sort that eliminates small values near the end of the list, making the algorithm faster.
13. **Pigeonhole Sort**: A sorting algorithm that is suitable for sorting lists of elements where the number of elements is known and the range of values is not significantly larger than the number of elements.
14. **Cycle Sort**: An in-place, non-comparison-based sorting algorithm that minimizes the number of writes to the original array.
15. **Bitonic Sort**: A parallel algorithm that works on bitonic sequences, sorting the elements by recursively merging two halves of the sequence.
16. **Gnome Sort**: A simple algorithm that sorts an array by iterating through it and swapping elements until the array is sorted.
17. **Odd-Even Sort**: A parallel sorting algorithm that works by alternating between odd and even phases, comparing and swapping elements.
18. **Flashsort**: A distribution sorting algorithm that is especially efficient when the input is uniformly distributed.
19. **Bead Sort**: A non-comparison-based sorting algorithm that simulates the movement of beads on a wire, providing a visual representation of sorting.
20. **Sleep Sort**: A humorous sorting algorithm that works by making threads sleep for a duration proportional to the values of the numbers being sorted.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Frenxys/sorting-visualizer.git
   cd sorting-visualizer
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to http://localhost:3000 to view the app.

## Contributing

Contributions are welcome! If you have suggestions for improvements or additional algorithms to implement, feel free to submit a pull request.

## License

This project is licensed under the MIT License.
