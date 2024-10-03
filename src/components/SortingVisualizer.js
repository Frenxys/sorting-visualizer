import React, { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/sortingAlgorithms'; // Make sure this path is correct
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(100); // Speed initially set to 100 milliseconds
  const [sorting, setSorting] = useState(false);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (sorting) return;
    const newArray = [];
    for (let i = 0; i < 100; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  };

  const startSort = async () => {
    setSorting(true);
    await bubbleSort(array, setArray, speed);
    setSorting(false);
  };

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <div className="visualizer-container">
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              backgroundColor: sorting ? 'orange' : 'turquoise',
            }}
          ></div>
        ))}
      </div>
      <div className="controls">
        <button onClick={resetArray} disabled={sorting}>
          Reset Array
        </button>
        <button onClick={startSort} disabled={sorting}>
          Start Bubble Sort
        </button>
        <label>
          Speed:
          <input
            type="range"
            min="1" // Adjusted minimum speed for faster sorting
            max="1000" // Adjusted maximum speed
            value={speed}
            onChange={handleSpeedChange}
            disabled={sorting}
          />
        </label>
      </div>
    </div>
  );
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default SortingVisualizer;
