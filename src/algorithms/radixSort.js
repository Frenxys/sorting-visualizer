export const sort = async (array, setArray, speed) => {
    const getMax = (arr) => Math.max(...arr);
    const countingSort = async (arr, exp) => {
      let output = new Array(arr.length).fill(0);
      let count = new Array(10).fill(0);
  
      for (let i = 0; i < arr.length; i++) {
        let digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
      }
  
      for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
      }
  
      for (let i = arr.length - 1; i >= 0; i--) {
        let digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
      }
  
      for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        setArray([...arr]);
        await new Promise((resolve) =>
          setTimeout(resolve, Math.max(1, (1000 - speed) / 20))
        );
      }
    };
  
    let maxNum = getMax(array);
    for (let exp = 1; Math.floor(maxNum / exp) > 0; exp *= 10) {
      await countingSort(array, exp);
    }
  };
  