export const heapSort = async (array, setArray, speed) => {
    let n = array.length;

    for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
        await heapify(array, n, i, setArray, speed);
    }

    for (let i = n - 1; i >= 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        setArray([...array]);  
        await sleep(speed);

        await heapify(array, i, 0, setArray, speed);
    }
};
const heapify = async (array, n, i, setArray, speed) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        setArray([...array]);  
        await sleep(speed);

        await heapify(array, n, largest, setArray, speed);
    }
};

// Funzione per dormire durante l'animazione
const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
