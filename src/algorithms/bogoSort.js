export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
  
    const isSorted = (arr) => {
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
      }
      return true;
    };
  
    const shuffle = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };
  
    while (!isSorted(newArray)) {
      shuffle(newArray);
      setArray([...newArray]);
      await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
    }
  };
  