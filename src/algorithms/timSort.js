export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    const minRun = 32;
    
    const insertionSort = async (arr, left, right) => {
      for (let i = left + 1; i <= right; i++) {
        const key = arr[i];
        let j = i - 1;
  
        while (j >= left && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        }
        arr[j + 1] = key;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
      }
    };
  
    const merge = async (arr, left, mid, right) => {
      const leftArray = arr.slice(left, mid + 1);
      const rightArray = arr.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;
  
      while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
          arr[k++] = leftArray[i++];
        } else {
          arr[k++] = rightArray[j++];
        }
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
      }
  
      while (i < leftArray.length) {
        arr[k++] = leftArray[i++];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
      }
  
      while (j < rightArray.length) {
        arr[k++] = rightArray[j++];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
      }
    };
  
    for (let start = 0; start < newArray.length; start += minRun) {
      await insertionSort(newArray, start, Math.min(start + minRun - 1, newArray.length - 1));
    }
  
    for (let size = minRun; size < newArray.length; size *= 2) {
      for (let left = 0; left < newArray.length; left += 2 * size) {
        const mid = left + size - 1;
        const right = Math.min(left + 2 * size - 1, newArray.length - 1);
        if (mid < right) await merge(newArray, left, mid, right);
      }
    }
  
    setArray([...newArray]);
  };
  