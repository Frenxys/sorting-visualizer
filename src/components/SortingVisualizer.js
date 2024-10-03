import React, { useState, useEffect, useCallback } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { useTheme } from '../ThemeContext';
import AlgorithmModal from './AlgorithmModal';
import Timer from './Timer';
import ControlPanel from './ControlPanel';
import './SortingVisualizer.css';

const algorithms = [
    { name: 'Bubble Sort', description: 'A simple sorting algorithm.', value: 'bubble' },
    { name: 'Selection Sort', description: 'A comparison sorting algorithm.', value: 'selection' },
    { name: 'Merge Sort', description: 'An efficient, stable sorting algorithm.', value: 'merge' }
];

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [speed, setSpeed] = useState(100);
    const [sorting, setSorting] = useState(false);
    const [arraySize, setArraySize] = useState(100);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const { isDarkMode } = useTheme();

    // Filter and reset the array
    const resetArray = useCallback(() => {
        if (sorting) return;
        const newArray = Array.from({ length: arraySize }, () => randomIntFromInterval(5, 500));
        setArray(newArray);
    }, [arraySize, sorting]);

    useEffect(() => {
        resetArray();
    }, [resetArray]);

    const startSort = async (algorithm) => {
        setSorting(true);
        const startTime = performance.now();

        if (algorithm === 'bubble') {
            await bubbleSort(array, setArray, speed);
        } else if (algorithm === 'selection') {
            await selectionSort(array, setArray, speed);
        } else if (algorithm === 'merge') {
            await mergeSort(array, setArray, speed);
        }

        const endTime = performance.now();
        setTimeElapsed(((endTime - startTime) / 1000).toFixed(3)); // Time in seconds
        setSorting(false);
    };

    const handleSpeedChange = (value) => setSpeed(Number(value));
    const handleSizeChange = (value) => {
        setArraySize(Number(value));
        resetArray();
    };

    return (
        <div className="visualizer-container">
            {/* Control Panel with the Timer */}
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
            <Timer timeElapsed={timeElapsed} />

            {/* Visual Array Bars */}
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

            {/* Algorithm Selection Modal */}
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

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export default SortingVisualizer;
