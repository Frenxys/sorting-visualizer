export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    let isSorted = false;
    let n = newArray.length;
  
    while (!isSorted) {
      isSorted = true;
  
      for (let i = 0; i < n - 1; i += 2) {
        if (newArray[i] > newArray[i + 1]) {
          [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
          setArray([...newArray]);
          await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
          isSorted = false;
        }
      }
  
      for (let i = 1; i < n - 1; i += 2) {
        if (newArray[i] > newArray[i + 1]) {
          [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
          setArray([...newArray]);
          await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
          isSorted = false;
        }
      }
    }
  
    setArray([...newArray]);
  };
  