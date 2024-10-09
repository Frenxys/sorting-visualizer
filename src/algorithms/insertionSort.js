export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    let length = newArray.length;
  
    for (let i = 1; i < length; i++) {
      let key = newArray[i];
      let j = i - 1;
  
      while (j >= 0 && newArray[j] > key) {
        newArray[j + 1] = newArray[j];
        j--;
        setArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
      }
      newArray[j + 1] = key;
      setArray([...newArray]);
    }
  };
  