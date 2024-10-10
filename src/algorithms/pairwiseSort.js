export const sort = async (array, setArray, speed) => {
    const newArray = [...array];

    const pairwiseSwap = async () => {
        for (let i = 0; i < newArray.length - 1; i += 2) {
            if (newArray[i] > newArray[i + 1]) {
                [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
                setArray([...newArray]);
                await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
            }
        }
    };

    const oddEvenSort = async () => {
        let sorted = false;
        while (!sorted) {
            sorted = true;
            await pairwiseSwap();
            for (let i = 1; i < newArray.length - 1; i += 2) {
                if (newArray[i] > newArray[i + 1]) {
                    [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
                    setArray([...newArray]);
                    await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
                    sorted = false;
                }
            }
        }
    };

    await oddEvenSort();
    setArray([...newArray]);
};
