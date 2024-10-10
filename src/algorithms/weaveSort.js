export const sort = async (array, setArray, speed) => {
    const newArray = [...array];

    const weaveMerge = async (l, mid, r) => {
        const left = newArray.slice(l, mid + 1);
        const right = newArray.slice(mid + 1, r + 1);

        let i = 0, j = 0, k = l;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                newArray[k++] = left[i++];
            } else {
                newArray[k++] = right[j++];
            }
            setArray([...newArray]);
            await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }
        while (i < left.length) {
            newArray[k++] = left[i++];
            setArray([...newArray]);
            await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }
        while (j < right.length) {
            newArray[k++] = right[j++];
            setArray([...newArray]);
            await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }
    };

    const weaveSortRec = async (l, r) => {
        if (l < r) {
            const mid = Math.floor((l + r) / 2);
            await weaveSortRec(l, mid);
            await weaveSortRec(mid + 1, r);
            await weaveMerge(l, mid, r);
        }
    };

    await weaveSortRec(0, newArray.length - 1);
    setArray([...newArray]);
};
