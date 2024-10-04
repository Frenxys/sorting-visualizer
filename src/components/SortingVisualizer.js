import React, { useState, useEffect, useCallback } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';
import { heapSort } from '../algorithms/heapSort';
import { shellSort } from '../algorithms/shellSort';
import { bogoSort } from '../algorithms/bogoSort';
import { useTheme } from '../ThemeContext';
import ControlPanel from './ControlPanel';
import AlgorithmModal from './AlgorithmModal';
import './SortingVisualizer.css';

const algorithms = [
    { name: 'Bubble Sort', value: 'bubble' },
    { name: 'Selection Sort', value: 'selection' },
    { name: 'Merge Sort', value: 'merge' },
    { name: 'Quick Sort', value: 'quick' },
    { name: 'Heap Sort', value: 'heap' },
    { name: 'Shell Sort', value: 'shell' },
    { name: 'Bogo Sort', value: 'bogo' }
];

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [speed, setSpeed] = useState(100);
    const [sorting, setSorting] = useState(false);
    const [arraySize, setArraySize] = useState(100);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
    const [executionTimes, setExecutionTimes] = useState([]);
    const { isDarkMode } = useTheme(); 

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

        switch (algorithm) {
            case 'bubble':
                await bubbleSort(array, setArray, speed);
                break;
            case 'selection':
                await selectionSort(array, setArray, speed);
                break;
            case 'merge':
                await mergeSort(array, setArray, speed);
                break;
            case 'quick':
                await quickSort(array, setArray, speed);
                break;
            case 'heap':
                await heapSort(array, setArray, speed);
                break;
            case 'shell':
                await shellSort(array, setArray, speed);
                break;
            case 'bogo':
                await bogoSort(array, setArray, speed);
                break;
            default:
                break;
        }

        const endTime = performance.now();
        const timeElapsed = (endTime - startTime).toFixed(3);

        setExecutionTimes((prevTimes) => [
            ...prevTimes,
            {
                algorithmName: algorithms.find((alg) => alg.value === algorithm).name,
                timeElapsed: `${timeElapsed} ms`,
                date: new Date().toLocaleString()
            }
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

            {/* Visualizza l'algoritmo selezionato */}
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
