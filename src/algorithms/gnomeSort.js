export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    const length = newArray.length;
    let index = 0;

    while (index < length) {
        setArray((prev) =>
            prev.map((value, i) => (i === index ? 'orange' : (i === index - 1 ? 'orange' : value)))
        );

        if (index === 0 || newArray[index] >= newArray[index - 1]) {
            index++;
        } else {
            const temp = newArray[index];
            newArray[index] = newArray[index - 1];
            newArray[index - 1] = temp;
            index--;
        }

        setArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));

        if (index < 0) {
            index = 0;  // Assicurati che l'indice non scenda sotto 0
        }
    }

    setArray([...newArray]);
    await new Promise((resolve) => setTimeout(resolve, 1000));
};
