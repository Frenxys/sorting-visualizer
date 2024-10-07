export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    const length = newArray.length;
    for (let i = 0; i < length - 1; i++) {
        let swapped = false;
        for (let j = 0; j < length - i - 1; j++) {
            setArray((prev) =>
                prev.map((value, index) => (index === j || index === j + 1 ? 'orange' : value))
            );
            if (newArray[j] > newArray[j + 1]) {
                const temp = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = temp;
                swapped = true;
            }
        }
        setArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        if (!swapped) break;
    }
};
