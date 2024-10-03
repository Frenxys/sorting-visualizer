import React from 'react';

const ExecutionTable = ({ executionTimes }) => {
    return (
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
    );
};

export default ExecutionTable;
