export const bogoSort = async (array, setArray, speed) => {
    while (!isSorted(array)) {
        shuffle(array);
        setArray([...array]); 
        await sleep(speed);   
    }
};

const isSorted = (array) => {
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            return false;
        }
    }
    return true;
};

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  
    }
};

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
