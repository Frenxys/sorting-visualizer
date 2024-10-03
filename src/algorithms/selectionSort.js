// src/algorithms/selectionSort.js

export const selectionSort = async (array, setArray, speed) => {
    const newArray = [...array]; // Create a copy of the array to sort
    const length = newArray.length;

    for (let i = 0; i < length - 1; i++) {
        let minIndex = i; // Assume the minimum is the first element

        // Highlight the current sorted part once at the start of the loop
        setArray((prev) => {
            const newColors = [...prev].map((value, index) =>
                index < i ? 'green' : value // Mark sorted elements as green
            );
            return newColors;
        });

        // Track the colors for current comparisons
        const colorUpdates = Array(length).fill(null);

        for (let j = i + 1; j < length; j++) {
            // Set the current and minIndex colors
            colorUpdates[j] = 'orange'; // Highlight the current comparison
            if (j === minIndex) {
                colorUpdates[minIndex] = 'yellow'; // Highlight the current minimum
            }

            // Find the index of the minimum element
            if (newArray[j] < newArray[minIndex]) {
                if (minIndex !== i) colorUpdates[minIndex] = null; // Reset previous minIndex color
                minIndex = j; // Update minIndex if a smaller element is found
            }
        }

        // Update colors after inner loop completion
        setArray((prev) => {
            const updatedColors = [...prev];
            for (let k = 0; k < colorUpdates.length; k++) {
                if (colorUpdates[k] !== null) {
                    updatedColors[k] = colorUpdates[k]; // Apply the collected colors
                }
            }
            return updatedColors;
        });

        // Swap the found minimum element with the first element of the unsorted array
        if (minIndex !== i) {
            const temp = newArray[i];
            newArray[i] = newArray[minIndex];
            newArray[minIndex] = temp;
        }

        // Update the array in the visualizer after the swap
        setArray([...newArray]);

        // Introduce delay based on speed
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 5))); // Speed adjustment
    }

    // Final marking of sorted elements
    setArray((prev) => {
        const newColors = [...prev].map((value, index) =>
            index < length ? 'green' : value // Mark sorted elements as green
        );
        return newColors;
    });
};
