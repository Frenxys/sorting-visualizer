export const quickSort = async (array, setArray, speed) => {
    const newArray = [...array];

    const sort = async (arr, low, high) => {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await sort(arr, low, pi - 1);
            await sort(arr, pi + 1, high);
        }
        setArray([...arr]);
    };

    const partition = async (arr, low, high) => {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            setArray((prev) => {
                const newColors = [...prev].map((value, index) =>
                    index === j ? 'orange' : value // Highlight the current element being compared
                );
                return newColors;
            });

            await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }

            // Show the array after each comparison
            setArray([...arr]);
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

        return i + 1;
    };

    await sort(newArray, 0, newArray.length - 1);
};
