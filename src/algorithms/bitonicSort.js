export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    const length = newArray.length;

    const bitonicMerge = async (low, cnt, dir) => {
        if (cnt > 1) {
            const k = Math.floor(cnt / 2);
            for (let i = low; i < low + k; i++) {
                if ((dir === 1 && newArray[i] > newArray[i + k]) || (dir === 0 && newArray[i] < newArray[i + k])) {
                    [newArray[i], newArray[i + k]] = [newArray[i + k], newArray[i]];
                    setArray([...newArray]);
                    await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
                }
            }
            await bitonicMerge(low, k, dir);
            await bitonicMerge(low + k, k, dir);
        }
    };

    const bitonicSortRec = async (low, cnt, dir) => {
        if (cnt > 1) {
            const k = Math.floor(cnt / 2);
            await bitonicSortRec(low, k, 1);
            await bitonicSortRec(low + k, k, 0);
            await bitonicMerge(low, cnt, dir);
        }
    };

    await bitonicSortRec(0, length, 1);
    setArray([...newArray]);
};
