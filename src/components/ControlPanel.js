import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({
    setIsModalOpen,
    resetArray,
    selectedAlgorithm,
    startSort,
    sorting,
    speed,
    arraySize,
    handleSpeedChange,
    handleSizeChange
}) => {
    return (
        <div className="control-panel">
            <button onClick={() => setIsModalOpen(true)} disabled={sorting}>
                Change Algorithm
            </button>
            <button onClick={resetArray} disabled={sorting}>Reset Array</button>

            {/* Show Run button only if an algorithm is selected */}
            {selectedAlgorithm && (
                <button 
                    onClick={() => startSort(selectedAlgorithm)} 
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
                    onChange={(e) => handleSpeedChange(e.target.value)}
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
                    onChange={(e) => handleSizeChange(e.target.value)}
                    disabled={sorting}
                />
            </label>
        </div>
    );
};

export default ControlPanel;
