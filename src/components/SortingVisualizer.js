import React, { useState, useEffect, useCallback } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { useTheme } from '../ThemeContext';
import AlgorithmModal from './AlgorithmModal';
import './SortingVisualizer.css';

const algorithms = [
    { name: 'Bubble Sort', value: 'bubble' },
    { name: 'Selection Sort', value: 'selection' },
    { name: 'Merge Sort', value: 'merge' }
];

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [speed, setSpeed] = useState(100);
    const [sorting, setSorting] = useState(false);
    const [arraySize, setArraySize] = useState(100);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
    const [executionTimes, setExecutionTimes] = useState([]); // Stato per la tabella
    const { isDarkMode } = useTheme(); 

    const resetArray = useCallback(() => {
        if (sorting) return;
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(randomIntFromInterval(5, 500));
        }
        setArray(newArray);
    }, [arraySize, sorting]);

    useEffect(() => {
        resetArray();
    }, [resetArray]);

    const startSort = async (algorithm) => {
        setSorting(true);
        const startTime = performance.now(); // Inizio temporizzazione

        if (algorithm === 'bubble') {
            await bubbleSort(array, setArray, speed);
        } else if (algorithm === 'selection') {
            await selectionSort(array, setArray, speed);
        } else if (algorithm === 'merge') {
            await mergeSort(array, setArray, speed);
        }

        const endTime = performance.now(); // Fine temporizzazione
        const timeElapsed = (endTime - startTime).toFixed(3); // Tempo impiegato in millisecondi

        // Aggiungi una nuova riga nella tabella con i dettagli dell'algoritmo e il tempo di esecuzione
        setExecutionTimes((prevTimes) => [
            ...prevTimes,
            {
                algorithmName: algorithms.find((alg) => alg.value === algorithm).name,
                timeElapsed: `${timeElapsed} ms`,
                date: new Date().toLocaleString() // Data e ora attuale
            }
        ]);

        setSorting(false);
    };

    const handleSpeedChange = (e) => {
        setSpeed(Number(e.target.value));
    };

    const handleSizeChange = (e) => {
        setArraySize(Number(e.target.value));
        resetArray();
    };

    return (
        <div className="visualizer-wrapper">
            <div className="visualizer-container">
                <div className="controls">
                    <button onClick={() => setIsModalOpen(true)}>Change Algorithm</button>
                    <button onClick={resetArray} disabled={sorting}>Reset Array</button>
                    {selectedAlgorithm && (
                        <button 
                            onClick={() => {
                                startSort(selectedAlgorithm);
                                setSelectedAlgorithm(null);
                            }}
                            disabled={sorting}
                        >
                            Run Algorithm
                        </button>
                    )}
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
                            min="5"
                            max="200"
                            value={arraySize}
                            onChange={handleSizeChange}
                            disabled={sorting}
                        />
                    </label>
                </div>
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

            {/* Tabella a destra del visualizer */}
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
