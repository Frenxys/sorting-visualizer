export const sort = async (array, setArray, speed) => {
    const bucketSort = async (arr, bucketSize = 5) => {
      if (arr.length === 0) return arr;
  
      const minValue = Math.min(...arr);
      const maxValue = Math.max(...arr);
  
      let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
      let buckets = new Array(bucketCount).fill(null).map(() => []);
  
      for (let i = 0; i < arr.length; i++) {
        let bucketIndex = Math.floor((arr[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(arr[i]);
      }
  
      arr = [];
  
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].length > 0) {
          await insertionSort(buckets[i]);
          arr = arr.concat(buckets[i]);
          setArray([...arr]);
          await new Promise((resolve) =>
            setTimeout(resolve, Math.max(1, (1000 - speed) / 20))
          );
        }
      }
  
      return arr;
    };
  
    const insertionSort = async (bucket) => {
      for (let i = 1; i < bucket.length; i++) {
        let key = bucket[i];
        let j = i - 1;
        while (j >= 0 && bucket[j] > key) {
          bucket[j + 1] = bucket[j];
          j--;
        }
        bucket[j + 1] = key;
      }
    };
  
    const sortedArray = await bucketSort([...array]);
    setArray([...sortedArray]);
  };
  