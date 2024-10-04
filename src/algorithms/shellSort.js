export const shellSort = async (array, setArray, speed) => {
    let n = array.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        
        for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j;

            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
                setArray([...array]); 
                await sleep(speed);   
            }
            array[j] = temp;
            setArray([...array]);  
            await sleep(speed);   
        }
    }
};

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
