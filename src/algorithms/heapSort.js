export const heapSort = async (array, setArray, speed) => {
    let n = array.length;

    // Costruisci l'heap (riorganizza l'array)
    for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
        await heapify(array, n, i, setArray, speed);
    }

    // Estrai gli elementi dall'heap uno per uno
    for (let i = n - 1; i >= 0; i--) {
        // Sposta la radice corrente alla fine
        [array[0], array[i]] = [array[i], array[0]];
        setArray([...array]);  // Aggiorna l'array per visualizzare il cambiamento
        await sleep(speed);

        // Richiama heapify sull'heap ridotto
        await heapify(array, i, 0, setArray, speed);
    }
};

// Funzione per ripristinare l'heap
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
