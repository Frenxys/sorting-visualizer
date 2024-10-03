import React from 'react';
import { useTheme } from '../ThemeContext';

const ArrayBars = ({ array }) => {
    const { isDarkMode } = useTheme();
    return (
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
    );
};

export default ArrayBars;
