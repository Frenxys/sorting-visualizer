export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    const n = newArray.length;
  
    for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
      let item = newArray[cycleStart];
      let pos = cycleStart;
  
      for (let i = cycleStart + 1; i < n; i++) {
        if (newArray[i] < item) pos++;
      }
  
      if (pos === cycleStart) continue;
  
      while (item === newArray[pos]) pos++;
  
      [newArray[pos], item] = [item, newArray[pos]];
      setArray([...newArray]);
      await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
  
      while (pos !== cycleStart) {
        pos = cycleStart;
        for (let i = cycleStart + 1; i < n; i++) {
          if (newArray[i] < item) pos++;
        }
  
        while (item === newArray[pos]) pos++;
  
        [newArray[pos], item] = [item, newArray[pos]];
        setArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
      }
    }
  
    setArray([...newArray]);
  };
  