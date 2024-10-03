import React from 'react';
import './AlgorithmModal.css';

const AlgorithmModal = ({ isOpen, algorithms, onClose, onSelect, searchTerm, setSearchTerm }) => {
    if (!isOpen) return null; // Don't render anything if the modal is not open

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Select a Sorting Algorithm</h2>
                <input
                    type="text"
                    placeholder="Search algorithm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '4px', width: '100%' }}
                />
                <div className="algorithm-cards-container">
                    {algorithms.map((algorithm) => (
                        <div 
                            key={algorithm.name} 
                            className="algorithm-card"
                            onClick={() => {
                                onSelect(algorithm.name);
                                onClose(); // Close the modal after selecting
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
