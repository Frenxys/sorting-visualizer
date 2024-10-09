export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
  
    const siftDown = async (arr, start, end) => {
      let root = start;
  
      while (true) {
        let leftChild = root * 2 + 1;
        if (leftChild > end) break;
  
        let rightChild = leftChild + 1;
        let swap = root;
  
        if (arr[swap] < arr[leftChild]) {
          swap = leftChild;
        }
  
        if (rightChild <= end && arr[swap] < arr[rightChild]) {
          swap = rightChild;
        }
  
        if (swap === root) break;
  
        [arr[root], arr[swap]] = [arr[swap], arr[root]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        root = swap;
      }
    };
  
    const smoothSort = async (arr) => {
      const n = arr.length;
      let heapSize = 0;
  
      for (let i = 0; i < n; i++) {
        heapSize++;
        await siftDown(arr, heapSize - 1, i);
  
        if (heapSize > 1) {
          let maxIndex = Math.floor((heapSize - 1) / 2);
          while (maxIndex > 0) {
            await siftDown(arr, maxIndex - 1, heapSize - 1);
            maxIndex--;
          }
        }
      }
  
      for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
        await siftDown(arr, 0, i - 1);
      }
    };
  
    await smoothSort(newArray);
    setArray([...newArray]);
  };
  