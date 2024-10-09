export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    const length = newArray.length;
  
    for (let i = 0; i < length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < length; j++) {
        if (newArray[j] < newArray[minIndex]) {
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
        setArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
      }
    }
  
    setArray([...newArray]);
  };
  