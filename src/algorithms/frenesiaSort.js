export const sort = async (array, setArray, speed) => {
    const newArray = [...array];
    
    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    };
  
    const isSorted = (arr) => arr.every((value, index) => index === 0 || arr[index - 1] <= value);
  
    while (!isSorted(newArray)) {
      shuffleArray(newArray);
      setArray([...newArray]);
  
      for (let i = 1; i < newArray.length; i++) {
        let key = newArray[i];
        let j = i - 1;
        while (j >= 0 && newArray[j] > key) {
          newArray[j + 1] = newArray[j];
          j--;
        }
        newArray[j + 1] = key;
        setArray([...newArray]);
        await new Promise((resolve) => setTimeout(resolve, Math.max(1, (1000 - speed) / 20)));
      }
    }
  
    setArray([...newArray]);
  };
  