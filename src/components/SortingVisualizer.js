import React, { useState, useEffect, useCallback } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort'; // Ensure this path is correct
import './SortingVisualizer.css';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [speed, setSpeed] = useState(100); // Speed initially set to 100 milliseconds
    const [sorting, setSorting] = useState(false);
    const [arraySize, setArraySize] = useState(100); // Initial size of the array

    const resetArray = useCallback(() => {
        if (sorting) return;
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(randomIntFromInterval(5, 500)); // Random values between 5 and 500
        }
        setArray(newArray);
    }, [sorting, arraySize]); // Added arraySize as a dependency

    useEffect(() => {
        resetArray();
    }, [resetArray]); // Including resetArray in dependency array

    const startSort = async () => {
        setSorting(true);
        await bubbleSort(array, setArray, speed);
        setSorting(false);
    };

    const handleSpeedChange = (e) => {
        setSpeed(Number(e.target.value));
    };

    const handleArraySizeChange = (e) => {
        setArraySize(Number(e.target.value)); // Update array size
        resetArray(); // Reset array with the new size
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
                      min="1"
                      max="1000"
                      value={speed}
                      onChange={handleSpeedChange}
                      disabled={sorting}
                  />
              </label>
              <label>
                  Array Size:
                  <input
                      type="number"
                      min="10"
                      max="200"
                      value={arraySize}
                      onChange={handleArraySizeChange}
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
