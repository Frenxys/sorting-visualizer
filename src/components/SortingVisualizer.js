import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../ThemeContext';
import ControlPanel from './ControlPanel';
import AlgorithmModal from './AlgorithmModal';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(100);
  const [sorting, setSorting] = useState(false);
  const [arraySize, setArraySize] = useState(100);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [executionTimes, setExecutionTimes] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);
  const { isDarkMode } = useTheme();

  const resetArray = useCallback(() => {
    if (sorting) return;
    const newArray = Array.from({ length: arraySize }, () => randomIntFromInterval(5, 500));
    setArray(newArray);
  }, [arraySize, sorting]);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  const loadAlgorithm = async (algorithm) => {
    try {
      const module = await import(`../algorithms/${algorithm}Sort`);
      return module.sort;
    } catch (error) {
      console.error(`Failed to load algorithm: ${algorithm}`, error);
    }
  };

  const loadAlgorithms = () => {
    const context = require.context('../algorithms', true, /Sort\.js$/);
    const availableAlgorithms = context.keys().map((file) => {
      const algorithmName = file.match(/\.\/(.*)Sort\.js/)[1];
      return { name: algorithmName.replace(/([A-Z])/g, ' $1').trim() + ' Sort', value: algorithmName.toLowerCase() };
    });
    setAlgorithms(availableAlgorithms);
  };

  useEffect(() => {
    loadAlgorithms();
  }, []);

  const startSort = async (algorithm) => {
    setSorting(true);
    const startTime = performance.now();

    const sortAlgorithm = await loadAlgorithm(algorithm);

    if (sortAlgorithm) {
      await sortAlgorithm(array, setArray, speed);
    }

    const endTime = performance.now();
    const timeElapsed = (endTime - startTime).toFixed(3);

    setExecutionTimes((prevTimes) => [
      ...prevTimes,
      {
        algorithmName: algorithms.find((alg) => alg.value === algorithm)?.name || 'Unknown',
        timeElapsed: `${timeElapsed} ms`,
        date: new Date().toLocaleString(),
      },
    ]);

    setSorting(false);
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
  };

  const handleSizeChange = (value) => {
    setArraySize(value);
    resetArray();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setArraySize(50);
      } else {
        setArraySize(100);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="visualizer-wrapper">
      <div className="visualizer-container">
        <ControlPanel
          setIsModalOpen={setIsModalOpen}
          resetArray={resetArray}
          selectedAlgorithm={selectedAlgorithm}
          startSort={startSort}
          sorting={sorting}
          speed={speed}
          arraySize={arraySize}
          handleSpeedChange={handleSpeedChange}
          handleSizeChange={handleSizeChange}
        />
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                height: `${value}px`,
                backgroundColor: isDarkMode ? '#ff8c00' : '#4682b4',
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="algorithm-info">
        <h3>Selected Algorithm: {selectedAlgorithm ? algorithms.find(alg => alg.value === selectedAlgorithm)?.name : "None"}</h3>
      </div>

      <div className="execution-table">
        <h3>Recent Sorting Times</h3>
        <table>
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Time Elapsed</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {executionTimes.map((entry, index) => (
              <tr key={index}>
                <td>{entry.algorithmName}</td>
                <td>{entry.timeElapsed}</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlgorithmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        algorithms={algorithms}
        onSelect={(algorithmName) => {
          setSelectedAlgorithm(algorithms.find(alg => alg.name === algorithmName)?.value);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default SortingVisualizer;
