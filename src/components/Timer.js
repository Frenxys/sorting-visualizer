import React from 'react';
import './Timer.css';

const Timer = ({ timeElapsed }) => {
    return (
        <div className="timer">
            <h3>Time Elapsed: {timeElapsed} seconds</h3>
        </div>
    );
};

export default Timer;
