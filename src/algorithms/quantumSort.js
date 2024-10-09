export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
  
    const quantumMerge = async (arr, start, end) => {
      if (start >= end) return;
  
      const mid = Math.floor((start + end) / 2);
      await quantumMerge(arr, start, mid);
      await quantumMerge(arr, mid + 1, end);
      
      let merged = [];
      let leftIndex = start;
      let rightIndex = mid + 1;
  
      while (leftIndex <= mid && rightIndex <= end) {
        if (arr[leftIndex] <= arr[rightIndex]) {
          merged.push(arr[leftIndex++]);
        } else {
          merged.push(arr[rightIndex++]);
        }
      }
  
      while (leftIndex <= mid) merged.push(arr[leftIndex++]);
      while (rightIndex <= end) merged.push(arr[rightIndex++]);
  
      for (let i = 0; i < merged.length; i++) {
        arr[start + i] = merged[i];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
      }
    };
  
    await quantumMerge(newArray, 0, newArray.length - 1);
    setArray([...newArray]);
  };
  