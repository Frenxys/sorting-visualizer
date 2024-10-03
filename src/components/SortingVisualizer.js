import React, { useState, useEffect, useCallback } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { useTheme } from '../ThemeContext'; // Import the theme context
import AlgorithmModal from './AlgorithmModal'; // Import the AlgorithmModal
import './SortingVisualizer.css';

const algorithms = [
    { name: 'Bubble Sort', description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.', value: 'bubble' },
    { name: 'Selection Sort', description: 'A comparison sorting algorithm that divides the input list into two parts: a sorted and an unsorted part.', value: 'selection' },
    // Add more algorithms here...
];

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [speed, setSpeed] = useState(100);
    const [sorting, setSorting] = useState(false);
    const [arraySize, setArraySize] = useState(100);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null); // State for selected algorithm
    const { isDarkMode } = useTheme(); // Get the dark mode state

    // Filter the algorithms based on the search term
    const filteredAlgorithms = algorithms.filter(algorithm =>
        algorithm.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resetArray = useCallback(() => {
        if (sorting) return; // Prevent resetting while sorting
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(randomIntFromInterval(5, 500)); // Generate random heights for bars
        }
        setArray(newArray); // Set the new array state
    }, [arraySize, sorting]);

    useEffect(() => {
        resetArray(); // Reset the array when the component mounts
    }, [resetArray]);

    const startSort = async (algorithm) => {
        setSorting(true); // Set sorting state to true
        if (algorithm === 'bubble') {
            await bubbleSort(array, setArray, speed); // Run bubble sort
        } else if (algorithm === 'selection') {
            await selectionSort(array, setArray, speed); // Run selection sort
        }
        setSorting(false); // Set sorting state back to false
    };

    const handleSpeedChange = (e) => {
        setSpeed(Number(e.target.value)); // Update speed based on slider input
    };

    const handleSizeChange = (e) => {
        setArraySize(Number(e.target.value)); // Update array size based on input
        resetArray(); // Reset array with new size
    };

    return (
        <div className="visualizer-container">
            <div className="controls">
                <button onClick={() => setIsModalOpen(true)}>Change Algorithm</button> {/* Button to open modal */}
                <button onClick={resetArray} disabled={sorting}>Reset Array</button> {/* Reset Button */}
                {/* Show the Run Algorithm button only if an algorithm is selected */}
                {selectedAlgorithm && (
                    <button 
                        onClick={() => {
                            startSort(selectedAlgorithm); // Start the selected sorting algorithm
                            setSelectedAlgorithm(null); // Reset selection after running
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
                            backgroundColor: isDarkMode ? '#ff8c00' : '#4682b4', // Set color based on theme
                        }}
                    ></div>
                ))}
            </div>
            {/* Modal for selecting sorting algorithms */}
            <AlgorithmModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                algorithms={filteredAlgorithms}
                onSelect={(algorithmName) => {
                    // Update selected algorithm and close modal after selecting
                    setSelectedAlgorithm(algorithms.find(alg => alg.name === algorithmName)?.value); 
                    setIsModalOpen(false);
                }}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} // Pass the state for the search input
            />
        </div>
    );
};

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min); // Generate a random integer
};

export default SortingVisualizer;
