export const bubbleSort = async (array, setArray, speed) => {
    let arr = [...array];
    let n = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
          setArray([...arr]);
          await sleep(speed);
        }
      }
      n--;
    } while (swapped);
  };
  
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  