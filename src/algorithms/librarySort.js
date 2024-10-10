export const sort = async (array, setArray, speed) => {
    const newArray = [...array];

    const insertionSort = async (gap) => {
        for (let i = gap; i < newArray.length; i++) {
            const temp = newArray[i];
            let j = i - gap;
            while (j >= 0 && newArray[j] > temp) {
                newArray[j + gap] = newArray[j];
                setArray([...newArray]);
                await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
                j -= gap;
            }
            newArray[j + gap] = temp;
            setArray([...newArray]);
            await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }
    };

    const librarySort = async () => {
        let gap = 1;
        while (gap < newArray.length) {
            await insertionSort(gap);
            gap = Math.floor(2 * gap);
        }
    };

    await librarySort();
    setArray([...newArray]);
};
