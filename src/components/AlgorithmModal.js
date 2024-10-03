import React from 'react';
import './AlgorithmModal.css';

const AlgorithmModal = ({ isOpen, algorithms, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Select Sorting Algorithm</h2>
                <div className="algorithm-cards-container">
                    {algorithms.map((algorithm) => (
                        <div 
                            key={algorithm.name} 
                            className="algorithm-card"
                            onClick={() => {
                                onSelect(algorithm.name);
                                onClose();
                            }}
                        >
                            <h3>{algorithm.name}</h3>
                            <p>{algorithm.description}</p>
                        </div>
                    ))}
                </div>
                <button className="close-modal" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default AlgorithmModal;
