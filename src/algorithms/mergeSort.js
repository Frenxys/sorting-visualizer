export const mergeSort = async (array, setArray, speed) => {
    const newArray = [...array]; // Crea una copia dell'array

    // Funzione ausiliaria per il merge di due sotto-array
    const merge = async (left, right, startIdx) => {
        let result = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            // Confronta gli elementi del sotto-array sinistro e destro
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }

        // Aggiunge gli eventuali elementi rimanenti nei sotto-array
        result = result.concat(left.slice(i)).concat(right.slice(j));

        // Copia il risultato nell'array principale e aggiorna la visualizzazione
        for (let k = 0; k < result.length; k++) {
            newArray[startIdx + k] = result[k];
            setArray([...newArray]); // Aggiorna l'array per il visualizzatore
            await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 10))); // Delay per la velocità
        }

        return result;
    };

    // Funzione ricorsiva per il Merge Sort
    const mergeSortRec = async (arr, startIdx) => {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = await mergeSortRec(arr.slice(0, mid), startIdx);
        const right = await mergeSortRec(arr.slice(mid), startIdx + mid);

        return await merge(left, right, startIdx);
    };

    await mergeSortRec(newArray, 0); // Avvia l'ordinamento a partire dall'array principale
};
