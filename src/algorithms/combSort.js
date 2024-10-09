export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    const shrinkFactor = 1.3;
    let gap = newArray.length;
    let sorted = false;

    while (!sorted) {
        gap = Math.floor(gap / shrinkFactor);
        if (gap < 1) gap = 1;
        sorted = true;

        for (let i = 0; i + gap < newArray.length; i++) {
            if (newArray[i] > newArray[i + gap]) {
                [newArray[i], newArray[i + gap]] = [newArray[i + gap], newArray[i]];
                sorted = false;
            }
            setArray([...newArray]);
            await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }
    }

    setArray([...newArray]);
};
