export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    const n = newArray.length;
    const m = Math.floor(n / 5);
    const l = Array(m).fill(0);
    const min = Math.min(...newArray);
    const max = Math.max(...newArray);

    if (min === max) return;

    for (let i = 0; i < n; i++) {
        const k = Math.floor((newArray[i] - min) / (max - min + 1) * m);
        l[k]++;
    }

    for (let i = 1; i < m; i++) {
        l[i] += l[i - 1];
    }

    let j = 0;
    for (let i = 0; i < n; i++) {
        while (j < n && l[Math.floor((newArray[j] - min) / (max - min + 1) * m)] !== 0) {
            const flashIndex = Math.floor((newArray[j] - min) / (max - min + 1) * m);
            l[flashIndex]--;
            const temp = newArray[j];
            newArray[j] = newArray[l[flashIndex]];
            newArray[l[flashIndex]] = temp;

            setArray([...newArray]);
            await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }
        j++;
    }

    setArray([...newArray]);
};
