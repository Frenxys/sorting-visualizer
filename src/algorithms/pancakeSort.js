export const sort = async (array, setArray, speed) => {
    const newArray = [...array];

    const flip = async (arr, k) => {
        let left = 0;
        let right = k;

        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
            setArray([...arr]);
            await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }
    };

    for (let currSize = newArray.length; currSize > 1; currSize--) {
        let maxIndex = newArray.indexOf(Math.max(...newArray.slice(0, currSize)));

        if (maxIndex !== currSize - 1) {
            await flip(newArray, maxIndex);
            await flip(newArray, currSize - 1);
        }
    }

    setArray([...newArray]);
};
