export const mergeSort = async (array, setArray, speed) => {
    const newArray = [...array];

    const merge = async (left, right, startIdx) => {
        let result = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }

        result = result.concat(left.slice(i)).concat(right.slice(j));

        for (let k = 0; k < result.length; k++) {
            newArray[startIdx + k] = result[k];
            setArray([...newArray]);
            await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }

        return result;
    };

    const mergeSortRec = async (arr, startIdx) => {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = await mergeSortRec(arr.slice(0, mid), startIdx);
        const right = await mergeSortRec(arr.slice(mid), startIdx + mid);

        return await merge(left, right, startIdx);
    };

    await mergeSortRec(newArray, 0);
};
