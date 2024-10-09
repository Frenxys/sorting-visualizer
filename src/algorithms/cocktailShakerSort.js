export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    let swapped = true;
    let start = 0;
    let end = newArray.length - 1;
  
    while (swapped) {
      swapped = false;
  
      for (let i = start; i < end; i++) {
        setArray((prev) =>
          prev.map((value, index) => (index === i || index === i + 1 ? 'orange' : value))
        );
        if (newArray[i] > newArray[i + 1]) {
          [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
          swapped = true;
        }
        await new Promise((resolve) =>
          setTimeout(resolve, Math.max(1, (1000 - speed) / 20))
        );
      }
  
      if (!swapped) break;
      swapped = false;
      end--;
  
      for (let i = end - 1; i >= start; i--) {
        setArray((prev) =>
          prev.map((value, index) => (index === i || index === i + 1 ? 'orange' : value))
        );
        if (newArray[i] > newArray[i + 1]) {
          [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
          swapped = true;
        }
        await new Promise((resolve) =>
          setTimeout(resolve, Math.max(1, (1000 - speed) / 20))
        );
      }
  
      start++;
    }
  
    setArray([...newArray]);
  };
  