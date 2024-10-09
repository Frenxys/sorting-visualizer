import React, { useState } from 'react';
import './AlgorithmModal.css';

const AlgorithmModal = ({ isOpen, algorithms, onClose, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const filteredAlgorithms = algorithms.filter((algorithm) =>
        algorithm.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Select Sorting Algorithm</h2>
                <input
                    type="text"
                    placeholder="Search algorithms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <div className="algorithm-cards-container">
                    {filteredAlgorithms.map((algorithm) => (
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
