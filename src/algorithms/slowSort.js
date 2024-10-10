export const sort = async (array, setArray, speed) => {
    const newArray = [...array];

    const slowSort = async (l, r) => {
        if (l >= r) return;
        const m = Math.floor((l + r) / 2);
        await slowSort(l, m);
        await slowSort(m + 1, r);
        if (newArray[m] > newArray[r]) {
            [newArray[m], newArray[r]] = [newArray[r], newArray[m]];
            setArray([...newArray]);
            await new Promise(resolve => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }
        await slowSort(l, r - 1);
    };

    await slowSort(0, newArray.length - 1);
    setArray([...newArray]);
};
