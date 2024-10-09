export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    let length = newArray.length;
    let gap = Math.floor(length / 2);
  
    while (gap > 0) {
      for (let i = gap; i < length; i++) {
        let temp = newArray[i];
        let j = i;
        while (j >= gap && newArray[j - gap] > temp) {
          newArray[j] = newArray[j - gap];
          j -= gap;
          setArray([...newArray]);
          await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }
        newArray[j] = temp;
        setArray([...newArray]);
      }
      gap = Math.floor(gap / 2);
    }
  };
  