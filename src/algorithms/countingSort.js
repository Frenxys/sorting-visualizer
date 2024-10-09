export const sort = async (array, setArray, speed) => {
    const max = Math.max(...array);
    const min = Math.min(...array);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(array.length).fill(0);
  
    for (let i = 0; i < array.length; i++) {
      count[array[i] - min]++;
    }
  
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }
  
    for (let i = array.length - 1; i >= 0; i--) {
      output[count[array[i] - min] - 1] = array[i];
      count[array[i] - min]--;
    }
  
    for (let i = 0; i < output.length; i++) {
      array[i] = output[i];
      setArray([...array]);
      await new Promise((resolve) =>
        setTimeout(resolve, Math.max(1, (1000 - speed) / 20))
      );
    }
  };
  