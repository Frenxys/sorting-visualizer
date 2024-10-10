export const sort = async (array, setArray, speed) => {
    const newArray = [...array];

    const stoogeSort = async (l, h) => {
        if (l >= h) return;

        if (newArray[l] > newArray[h]) {
            [newArray[l], newArray[h]] = [newArray[h], newArray[l]];
            setArray([...newArray]);
            await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }

        if (h - l + 1 > 2) {
            const t = Math.floor((h - l + 1) / 3);
            await stoogeSort(l, h - t);
            await stoogeSort(l + t, h);
            await stoogeSort(l, h - t);
        }
    };

    await stoogeSort(0, newArray.length - 1);
    setArray([...newArray]);
};
