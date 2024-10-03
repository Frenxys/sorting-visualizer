// src/algorithms/bubbleSort.js

export const bubbleSort = async (array, setArray, speed) => {
    const newArray = [...array]; // Create a copy of the array to sort
    const length = newArray.length;

    for (let i = 0; i < length - 1; i++) {
        let swapped = false; // Flag to detect if a swap occurred in this pass

        for (let j = 0; j < length - i - 1; j++) {
            // Update color of the compared bars
            setArray((prev) =>
                prev.map((value, index) => (index === j || index === j + 1 ? 'orange' : value))
            );

            // Compare and swap if needed
            if (newArray[j] > newArray[j + 1]) {
                const temp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = temp;
                swapped = true; // A swap has occurred
            }

            // Update the array in the visualizer
            setArray([...newArray]);

            // Introduce delay based on speed (make it faster)
            await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 10))); // Dividing by 10 to make it faster
        }

        // If no two elements were swapped by inner loop, then break
        if (!swapped) break;
    }
};
